import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

const App = () => {
  const [textToEncode, setTextToEncode] = useState<string>("");
  const [soundUri, setSoundUri] = useState<string | null>(null);
  const [decodedText, setDecodedText] = useState('');
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status !== 'granted') {
        console.error('Audio recording permission not granted');
      }
    };

    requestPermissions();
  }, []);

  const encodeText = async () => {
    try {
      const protocolId = '5';
      const volume = '20';
      const response = await fetch('http://192.168.1.32:8080/encode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `text=${encodeURIComponent(textToEncode)}&protocolId=${encodeURIComponent(protocolId)}&volume=${encodeURIComponent(volume)}`,
      });
      const result = await response.json();
      const base64Audio = result.audio;
      const uri = FileSystem.documentDirectory + 'encodedAudioTest.wav';
      await FileSystem.writeAsStringAsync(uri, base64Audio, { encoding: FileSystem.EncodingType.Base64 });
      console.log('Text encoded successfully')
      console.log('The uri is: ', uri);
      setSoundUri(uri);
      // const soundObject = new Audio.Sound();
      // await soundObject.loadAsync({ uri });
      // setSound(soundObject);
    } catch (error) {
      console.error(error);
    }
  };

  const playEncodedSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      if (soundUri) {
        await soundObject.loadAsync({ uri: soundUri });
        console.log('The uri is: ', soundUri);
        console.log('Playing sound');
        await soundObject.playAsync();
      } else {
        console.log('No sound object is available to play.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HighQuality);
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    setSoundUri(uri);
    console.log('Recording stopped and stored at', uri);
  };

  const decodeEncodedSound = async () => {
    try {
      if (!soundUri) {
        console.error('No sound URI available for decoding.');
        return;
      }
       // Read the audio file into a Base64-encoded string
       const base64Audio = await FileSystem.readAsStringAsync(soundUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Send the POST request to the decode endpoint
      const response = await fetch(`http://192.168.1.32:8080/decode`, {
        method: 'POST',
        body: JSON.stringify({ file: base64Audio }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to decode audio: ${response.statusText}`);
      }
  
      const result = await response.json();
      setDecodedText(result.text);
    } catch (error) {
      console.error(error);
    }
  };
  
  const decodeMicrophoneSound = async () => {
    try {
      if (!soundUri) {
        console.error('No sound URI available for decoding.');
        return;
      }
      // Assuming the soundUri state variable holds the URI of the recorded sound
      const base64Audio = await FileSystem.readAsStringAsync(soundUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Send the POST request to the decode endpoint
      const response = await fetch(`http://192.168.1.32:8080/decode`, {
        method: 'POST',
        body: JSON.stringify({ file: base64Audio }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to decode audio: ${response.statusText}`);
      }
  
      const result = await response.json();
      setDecodedText(result.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter text to encode"
        value={textToEncode}
        onChangeText={setTextToEncode}
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Encode Text" onPress={encodeText} />
      <Button title="Play Encoded Sound" onPress={playEncodedSound} />
      <Button title="Start Recording" onPress={startRecording} />
      <Button title="Stop Recording" onPress={stopRecording} />
      <Button title="Decode Encoded Sound" onPress={decodeEncodedSound} />
      <Button title="Decode Microphone Sound" onPress={decodeMicrophoneSound} />
      {decodedText && <Text>Decoded Text: {decodedText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
});

export default App;