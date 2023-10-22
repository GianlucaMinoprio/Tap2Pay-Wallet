from flask import Flask, request, jsonify, send_file
from pydub import AudioSegment
import ggwave
import soundfile as sf
import numpy as np
import io
import tempfile
import base64

app = Flask(__name__)

# Initialize ggwave instance once at app startup
ggwave_instance = ggwave.init()


@app.route('/encode', methods=['POST'])
def encode():
    try:
        text = request.form['text']

        # Fetch the parameters from the request or use default values if not provided
        protocolId = int(request.form.get('protocolId', 5))
        volume = int(request.form.get('volume', 10))
        print(f"Encoding text: {text}")  # Debug print
        print(f"protocolId: {protocolId}")
        print(f"volume: {volume}")
        waveform = ggwave.encode(text, protocolId=protocolId, volume=volume)
        waveform_bytes = bytes(waveform)
        waveform_np = np.frombuffer(waveform_bytes, dtype=np.float32)

        with tempfile.NamedTemporaryFile(suffix='.wav', delete=True) as tmpfile:
            sf.write(tmpfile.name, waveform_np, samplerate=48000)
            print(f"Saved encoded audio as '{tmpfile.name}'")  # Debug print

            with open(tmpfile.name, 'rb') as f:
                encoded_audio = base64.b64encode(f.read()).decode('utf-8')

            return jsonify({"audio": encoded_audio})

    except Exception as e:
        return str(e), 500


@app.route('/decode', methods=['POST'])
def decode():
    try:
        request_data = request.get_json()
        base64_audio = request_data.get('file')
        if not base64_audio:
            return "No file provided", 400

        # Decode the base64 string
        audio_data = base64.b64decode(base64_audio)

        # Create an in-memory binary stream from the audio data
        file_stream = io.BytesIO(audio_data)
        file_stream.seek(0)  # Reset the stream cursor to the start

        decoded_text = decode_wav_file(file_stream, ggwave_instance)

        if decoded_text:
            return jsonify({"text": decoded_text})
        else:
            return "Failed to decode", 400
    except Exception as e:
        print(f'Error: {e}')  # Debugging line
        return str(e), 500


def decode_wav_file(file_stream, ggwave_instance):
    file_stream.seek(0)  # Reset the stream cursor to the start
    audio_segment = AudioSegment.from_file(file_stream)
    audio_segment = audio_segment.set_channels(1)  # Convert to mono
    audio_segment = audio_segment.set_frame_rate(
        48000)  # Set frame rate to 48000 Hz

    # Write the converted audio data to a temporary file
    with tempfile.NamedTemporaryFile(delete=True, suffix=".wav") as tmpfile:
        audio_segment.export(tmpfile.name, format="wav")

        # Now read and process the WAV file
        with sf.SoundFile(tmpfile.name, 'r') as f:
            for block in f.blocks(blocksize=4096, dtype='float32'):
                data = block.tobytes()
                print('Received data of length:', len(data))  # Debug print
                res = ggwave.decode(ggwave_instance, data)
                print('Received result:', res)
                if res is not None:
                    try:
                        decoded_text = res.decode("utf-8")
                        print('Received text:', decoded_text)
                        return decoded_text
                    except Exception as e:
                        print("Decoding error:", e)
    return None


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
