from flask import Flask, request, send_file, jsonify
from pydub import AudioSegment
import numpy as np
import ggwave
import tempfile
import os

app = Flask(__name__)


def waveform_to_audio_file(waveform, filename):
    audio_segment = AudioSegment(
        waveform,
        frame_rate=48000,
        sample_width=2,
        channels=1
    )
    audio_segment.export(filename, format="wav")


@app.route('/encode', methods=['POST'])
def encode():
    text = request.form.get('text')
    if not text:
        return "No text provided", 400

    waveform = ggwave.encode(text, protocolId=5, volume=10)
    encoded_audio_file_name = tempfile.mktemp(suffix='.wav')
    waveform_to_audio_file(np.frombuffer(
        waveform, dtype=np.float32), encoded_audio_file_name)

    return send_file(encoded_audio_file_name, as_attachment=True, attachment_filename='encoded_audio.wav')


@app.route('/decode', methods=['POST'])
def decode():
    try:
        audio_file = request.files['audio_file']
        audio_segment = AudioSegment.from_file(audio_file)
        waveform = np.array(audio_segment.get_array_of_samples())
        if audio_segment.channels == 2:
            waveform = waveform.reshape((-1, 2)).mean(axis=1)
        # Convert to unsigned 8-bit integer values
        waveform = (waveform / 32767.0 * 255).astype(np.uint8)
        waveform_bytes = waveform.tobytes()  # Now convert the integer values to bytes
        print(len(waveform_bytes))
        instance = ggwave.init()
        text = ggwave.decode(instance, waveform_bytes)
        print(text)
        if text is None:
            raise ValueError("Failed to decode audio")
        return text

    except Exception as e:
        print(f'Error: {e}')  # Debugging line
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
