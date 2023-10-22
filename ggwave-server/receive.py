import ggwave
import sounddevice as sd
import numpy as np


def record_audio(duration, samplerate=48000):
    print(f"Recording audio for {duration} seconds...")
    audio_data = sd.rec(int(samplerate * duration), samplerate=samplerate,
                        channels=1, dtype='float32', blocking=True)
    return audio_data.tobytes()


def decode_audio(audio_data_bytes):

    instance = ggwave.init()
    # Decode the audio data
    decoded_message = ggwave.decode(instance, audio_data_bytes)
    return decoded_message


def main():
    # Record audio
    duration = 5  # record for 5 seconds
    recorded_audio_data = record_audio(duration)

    # Decode audio
    decoded_message = decode_audio(recorded_audio_data)
    if decoded_message is None or decoded_message == "":
        print("No message decoded")
    else:
        res = decoded_message.decode("utf-8")
        print(f"Decoded message: {res}")


if __name__ == '__main__':
    main()
