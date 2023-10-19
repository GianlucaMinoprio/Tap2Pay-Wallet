from flask import Flask, request, jsonify
import ggwave

app = Flask(__name__)


@app.route('/encode', methods=['POST'])
def encode():
    text = request.form['text']
    waveform = ggwave.encode(text, protocolId=5, volume=10)
    return jsonify({'waveform': list(waveform)})


@app.route('/decode', methods=['POST'])
def decode():
    try:
        waveform = request.data
        waveform_bytes = bytes(waveform)
        # Debugging line
        instance = ggwave.init()
        text = ggwave.decode(instance, waveform_bytes)
        return text
    except Exception as e:
        print(f'Error: {e}')  # Debugging line
        return str(e), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
