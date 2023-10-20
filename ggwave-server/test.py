import requests
import sounddevice as sd
import soundfile as sf

BASE_URL = 'http://10.41.170.221:8080/'


def test_encoding_decoding():
    # Test Encoding
    text = "hello world"
    response = requests.post(f'{BASE_URL}/encode', data={'text': text})
    if response.status_code != 200:
        print(f'Encoding failed: {response.text}')
        return

    # Save the received .wav file on the client side
    with open('encoded.wav', 'wb') as f:
        f.write(response.content)
    print(f"Saved encoded audio as 'encoded.wav'")

    # Test Decoding by sending back the saved .wav file
    with open('encoded.wav', 'rb') as f:
        response = requests.post(f'{BASE_URL}/decode', files={'file': f})

    print(f'Response from server: {response.text}')
    if response.status_code != 200:
        print(f'Decoding failed: {response.text}')
        return

    # Assuming server sends a JSON response
    decoded_text = response.json()['text']
    if decoded_text == text:
        print('Encoding and decoding successful!')
    else:
        print(f'Decoding mismatch: Expected "{text}" but got "{decoded_text}"')

    # Play back the saved .wav file
    waveform_np, sr = sf.read('encoded.wav')
    print(f"Transmitting text '{decoded_text}' ...")
    sd.play(waveform_np, samplerate=sr)
    sd.wait()  # Wait until audio is finished playing
    print("Done")


if __name__ == '__main__':
    test_encoding_decoding()
