import React, { memo, useEffect, useState } from "react";
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

import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = memo(() => {
  const { goBack } = useNavigation();
  const theme = useTheme();

  const handleSignIn = React.useCallback(() => {goBack()}, []);
  const handleFaceID = React.useCallback(() => {}, []);
  const handleForgotPass = React.useCallback(() => {}, []);
  const handleSignUp = React.useCallback(() => {
    goBack();
  }, []);

  const [hide, setHide] = React.useState(false);
  const styles = useStyleSheet(themedStyles);
  // SafeAddress pour Test 2 : 0x62A81a211B75E46C83B3c7B50c14BafCc944F3f8
  // SafeAddress pour Test 1 : 
  const address = "0x62A81a211B75E46C83B3c7B50c14BafCc944F3f8"; // Clé Hardcodé pour la demo

  const [SafeName, setName] = useState('');
  const [safeAddress, setSafeAddress] = useState('');
  const name = "Axel Cochepin"

  useEffect(() => {
    const fetchData = async () => {
      const savedName = await AsyncStorage.getItem('name');
      const savedSafeAddress = await AsyncStorage.getItem('safeAddress');
      if (savedName) setName(savedName);
      if (savedSafeAddress) setSafeAddress(savedSafeAddress);
    };
    fetchData();
  }, []);



  return (
    <Container style={styles.container}>
      <Content>

        <Text marginTop={100} category="call-out" center>
          Welcome back!
        </Text>

        <Text marginTop={12} category="title2" center>
          {name}
        </Text>

        <Text style={styles.addr} marginTop={4} category="label" center status="placeholder">
          {address}
        </Text>


        <View style={styles.layout}>
          
          <Button children="Sign In" onPress={handleSignIn} />
          
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
          <TouchableOpacity onPress={handleSignUp}>
            <Text category="call-out">SIGN UP!</Text>
          </TouchableOpacity>
        </View>
      </HideWithKeyboard>
    </Container>
  );
});

export default SignIn;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  layout: {
    marginTop: 60,
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
  addr: {
    paddingTop: 10,
    height: 50,
  }
});
