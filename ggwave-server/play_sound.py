import sounddevice as sd
import numpy as np
import wave


def play_sound(filename):
    with wave.open(filename, 'rb') as wf:
        samplerate = wf.getframerate()
        data = wf.readframes(wf.getnframes())
        audio_data = np.frombuffer(data, dtype=np.int16)
    sd.play(audio_data, samplerate)
    sd.wait()  # Wait until audio playback is done


# To play the sound:
play_sound('encoded.wav')
