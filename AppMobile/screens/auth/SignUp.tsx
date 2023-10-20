import React, { memo } from "react";
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

const SignUp = memo(() => {
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
            
          />
          <Button children="Sign Up" onPress={handleSignIn} />
          
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
