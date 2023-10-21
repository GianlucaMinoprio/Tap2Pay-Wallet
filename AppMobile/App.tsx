import React, { useState, useEffect} from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const App = () => {
const [textToEncode, setTextToEncode] = useState<string>("");
const [encodedAudioUri, setEncodedAudioUri] = useState<string | null>(null);
const [soundUri, setSoundUri] = useState<string | null>(null);
const [decodedText, setDecodedText] = useState('');

useEffect(() => {
  const setAudioMode = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,  // This line ensures playback through the main speaker
      });
    } catch (error) {
      console.error(error);
    }
  };

  setAudioMode();
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

const decodeSound = async () => {
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


return (
  <View style={styles.container}>
    <TextInput
      placeholder="Enter text to encode"
      value={textToEncode}
      onChangeText={setTextToEncode}
      style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20 }}
    />
    <Button title="Encode Text" onPress={encodeText} />
    {encodedAudioUri && <Button title="Play Encoded Sound" onPress={playEncodedSound} />}
    <Button title="Play Encoded Sound" onPress={playEncodedSound} />
    <Button title="Decode Sound" onPress={decodeSound} />
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