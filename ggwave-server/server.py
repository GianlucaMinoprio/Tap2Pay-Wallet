from flask import Flask, request, jsonify, send_file
import ggwave
import soundfile as sf
import numpy as np
import io
import tempfile

app = Flask(__name__)

# Initialize ggwave instance once at app startup
ggwave_instance = ggwave.init()


@app.route('/encode', methods=['POST'])
def encode():
    try:
        text = request.form['text']
        print(f"Encoding text: {text}")  # Debug print
        waveform = ggwave.encode(text, protocolId=5, volume=10)
        waveform_bytes = bytes(waveform)
        waveform_np = np.frombuffer(waveform_bytes, dtype=np.float32)
        with tempfile.NamedTemporaryFile(suffix='.wav', delete=True) as tmpfile:
            sf.write(tmpfile.name, waveform_np, samplerate=48000)
            print(f"Saved encoded audio as '{tmpfile.name}'")  # Debug print
            return send_file(tmpfile.name, as_attachment=True, cache_timeout=0)
    except Exception as e:
        return str(e), 500


@app.route('/decode', methods=['POST'])
def decode():
    try:
        # Access the uploaded file
        uploaded_file = request.files['file']
        print(f"Decoding file: {uploaded_file.filename}")  # Debug print

        # Create an in-memory binary stream from the uploaded file
        file_stream = io.BytesIO(uploaded_file.read())

        decoded_text = decode_wav_file(file_stream, ggwave_instance)

        if decoded_text:
            return jsonify({"text": decoded_text})
        else:
            return "Failed to decode", 400
    except Exception as e:
        print(f'Error: {e}')  # Debugging line
        return str(e), 500


def decode_wav_file(file_stream, ggwave_instance):
    # Open the WAV file from in-memory binary stream
    with sf.SoundFile(file_stream, 'r') as f:
        # Iterate through the file in chunks of 1024 frames
        for block in f.blocks(blocksize=1024, dtype='float32'):
            # Convert the chunk to bytes
            data = block.tobytes()
            res = ggwave.decode(ggwave_instance, data)
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
