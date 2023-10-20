import requests
import os

# Base URL of your server
BASE_URL = 'http://192.168.1.32:8080/'


def test_encoding_decoding():
    # Test Encoding
    text = "hello world"
    response = requests.post(f'{BASE_URL}/encode', data={'text': text})
    if response.status_code != 200:
        print(f'Encoding failed: {response.text}')
        return

    # Save the received audio file to disk
    encoded_audio_file_name = 'encoded_audio.wav'
    with open(encoded_audio_file_name, 'wb') as f:
        f.write(response.content)
    print(f'Encoded audio file saved as {encoded_audio_file_name}')

    # Test Decoding
    with open(encoded_audio_file_name, 'rb') as f:
        response = requests.post(f'{BASE_URL}/decode', files={'audio_file': f})
    # Optional: delete the encoded audio file after decoding
    os.remove(encoded_audio_file_name)

    if response.status_code != 200:
        print(f'Decoding failed: {response.text}')
        return

    decoded_text = response.text
    if decoded_text == text:
        print('Encoding and decoding successful!')
    else:
        print(f'Decoding mismatch: Expected "{text}" but got "{decoded_text}"')


if __name__ == '__main__':
    test_encoding_decoding()
