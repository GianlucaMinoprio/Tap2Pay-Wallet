import ggwave
import sounddevice as sd
import numpy as np

# generate audio waveform for string "hello python"
waveform = ggwave.encode("Coucou Lucie", protocolId=1, volume=20)

# Convert byte data to numpy array of float32
waveform_np = np.frombuffer(waveform, dtype=np.float32)

print("Transmitting text 'hello python' ...")
sd.play(waveform_np, samplerate=48000)
sd.wait()  # Wait until audio is finished playing
print("Done")
