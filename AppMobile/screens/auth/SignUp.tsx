import React, { memo, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import HideWithKeyboard from "components/HideWithKeyboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = memo(() => {
  const { goBack } = useNavigation();
  const theme = useTheme();

  const [name, setName] = useState('');  // État pour stocker le nom de l'utilisateur
  const [safeAddress, setSafeAddress] = useState('');  // État pour stocker l'adresse du compte Safe

  const handleSignIn = React.useCallback(() => {goBack()}, []);
  const handleFaceID = React.useCallback(() => {}, []);
  const handleForgotPass = React.useCallback(() => {}, []);

  const createSafeAccount = async () => {
    try {
      console.log('Création du compte Safe...');
      const response = await fetch('http://192.168.1.96:8081/init-safe', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Compte Safe créé avec succès!');
      console.log(data);
      console.log(data.safeAddress)
      setSafeAddress(data.safeAddress);  // Enregistrez l'adresse du compte Safe dans l'état
      await AsyncStorage.setItem('name', name);  // Enregistrez le nom dans AsyncStorage
      await AsyncStorage.setItem('safeAddress', data.safeAddress);  // Enregistrez l'adresse Safe dans AsyncStorage
    } catch (error) {
      console.error('Erreur lors de la création du compte Safe:', error);
    }
  };

  const handleSignUp = React.useCallback(() => {
    createSafeAccount();
  }, []);

  const [hide, setHide] = React.useState(false);
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <Content>
        <Text marginTop={50} category="call-out" center>
          Welcome
        </Text>
        <Text marginTop={12} category="title2" center>
          Sign Up
        </Text>
        <View style={styles.layout}>

          <Input
            secureTextEntry={hide}
            placeholder="Your name"
            status="primary"
            style={styles.input}
            value={name}  // Liaison de la valeur de l'input à l'état name
            onChangeText={setName}  // Mettez à jour l'état name lors de la saisie de l'utilisateur
          />

          <Button children="Sign Up" onPress={handleSignUp} />
          
          <Image
            source={Images.logo4}
            /* @ts-ignore */
            style={styles.image}
          />
        </View>
      </Content>
      <HideWithKeyboard>
        <View style={[styles.bottom]}>
          <TouchableOpacity onPress={handleForgotPass}>
            <Text category="call-out">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignIn}>
            <Text category="call-out">SIGN IN!</Text>
          </TouchableOpacity>
        </View>
      </HideWithKeyboard>
    </Container>
  );
});

export default SignUp;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  layout: {
    marginHorizontal: 32,
  },
  icon: {
    width: 48,
    height: 48,
  },
  button: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 24,
  },
  image: {
    alignSelf: "center",
    marginTop: 100,
    marginBottom: 48,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 32,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  input: {
    marginVertical: 24,
  },
  eyes: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
});
