import React, { memo , useState, useEffect} from "react";
import { FlatList, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { useTheme, Layout, TopNavigation, Icon } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Bill from "./Bill";
import Chart from "./Chart";
import Friend from "./Friend";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import CurrencyText from "components/CurrencyText";
import NavigationAction from "components/NavigationAction";
import Transaction from "./Transaction";
import ButtonText from "components/ButtonText";


import keyExtractor from "utils/keyExtractor";
import { dataBill, dataFriend, dataTransaction, dataSendReq } from "./data";
import { FinanceStackParamList } from "navigation/type";
import { RefreshControl } from "react-native-web-refresh-control";
import SendReq from "./SendReq";

import { RootStackParamList } from "navigation/type";

import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

const RemindBill = memo(() => {
  const theme = useTheme();
  const { top, bottom, width } = useLayout();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { goBack } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const [textToEncode, setTextToEncode] = useState<string>("");
  const [soundUri, setSoundUri] = useState<string | null>(null);
  const [decodedText, setDecodedText] = useState('');
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const [isRecording, setIsRecording] = useState(false);

  const [hasPermissions, setHasPermissions] = useState(false); // Nouvel état pour suivre les permissions
  
  

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status === 'granted') {
        setHasPermissions(true);  // Mettre à jour l'état lorsque les permissions sont accordées
      } else {
        console.error('Audio recording permission not granted');
      }
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    if (hasPermissions) {  // Vérifier si les permissions ont été accordées
      // Démarrer l'enregistrement dès que les permissions sont accordées
      startRecording();

      // Vérifier toutes les 6 secondes
      const interval = setInterval(() => {
        if (isRecording) {
          stopRecording();
        }
      }, 6000);

      return () => {
        clearInterval(interval);
        if (recording && isRecording) {
          stopRecording();
        }
      };
    }
  }, [hasPermissions, isRecording]);  // Ajoutez hasPermissions comme dépendance





  const handlePay = () => {
    navigation.navigate('Finance', { screen: 'Pay' }); // Navigate to Pay screen when audio file detected
  }

  const handleRequest = () => {
    navigation.navigate('Finance', { screen: 'Request' });
  }

  const renderBill = React.useCallback(({ item }) => {
    return <Bill item={item} onPress={goBack} />;
  }, []);

  const renderAvatar = React.useCallback(({ item }) => {
    return <Friend item={item} onPress={goBack} />;
  }, []);

  const renderTransaction = React.useCallback(({ item }) => {
    return <Transaction item={item} onPress={goBack} />;
  }, []);

  const renderSendReq = React.useCallback(({ item }) => {
    return <SendReq item={item} onPress={handleRequest} />;
  }, []);

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        playThroughEarpieceAndroid: true,  // Set to true to use the earpiece (or false to use the speaker)
      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HighQuality);
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const decodeAndNavigate = async () => {
    await decodeEncodedSound();
    if (decodedText) {
      navigation.navigate('Pay', { decodedText: decodedText });
    } else {
      startRecording();
    }
  };


  const stopRecording = async () => {
    if (!recording) return;
    console.log('Stopping recording..');
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    setSoundUri(uri);
    console.log('Recording stopped and stored at', uri);
    setIsRecording(false);
    await decodeAndNavigate();
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
      const response = await fetch(`http://192.168.1.96:8080/decode`, {
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

  const listHeaderComponent = React.useCallback(() => {
    return (
      <>
        
        <View style={styles.row}>
          <Text category="title3" marginTop={16}>History</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.iconView}
            onPress={goBack}
          >
            <Icon
              pack="assets"
              name="arrowRight16"
              style={[styles.icon, { tintColor: theme["color-basic-1800"] }]}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }, []);

  return (
    <Container useSafeArea={false}>
      <Layout level="2" style={[styles.header, { paddingTop: top }]}>
        
        <Text category="title2" marginLeft={28}>
          Tap2Pay
        </Text>
      </Layout>
      <Content
        refreshControl={<RefreshControl tintColor="#C6DABF" />}
        contentContainerStyle={{ paddingBottom: bottom + 65 }}
      >
        <Text category="title4" marginLeft={24} marginTop={24}>
          Account
        </Text>
        <FlatList
          data={dataBill || []}
          renderItem={renderBill}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width - 52}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          contentContainerStyle={styles.contentBill}
        />

        <FlatList
          data={dataSendReq || []}
          renderItem={renderSendReq}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width - 52}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          contentContainerStyle={styles.contentSendReq}
        />




        <Text category="title4" marginTop={8} marginLeft={24}>
          Friends Share
        </Text>
        <FlatList
          data={dataFriend || []}
          renderItem={renderAvatar}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.contentFriend}
        />
        
        <FlatList
        data={dataTransaction || []}
        renderItem={renderTransaction}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={{ paddingBottom: bottom + 56 }}
        refreshControl={<RefreshControl tintColor="#C6DABF" />}
      />
      </Content>
      
    </Container>
  );
});

export default RemindBill;

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 8,
  },
  contentBill: {
    paddingLeft: 24,
    paddingTop: 16,
    paddingRight: 8,
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  contentSendReq: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    margin: 8,
    width: 10,
  },

  contentFriend: {
    paddingLeft: 24,
    paddingTop: 16,
  },
  box: {
    flex: 1,
    paddingTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
  },
  icons: {
    width: 20,
    height: 20,
  },
  row: {
    paddingLeft: 24,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  iconView: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
});
