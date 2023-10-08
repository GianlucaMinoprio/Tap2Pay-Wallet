import React, { memo } from "react";
import {
  useWindowDimensions,
  Image,
  ImageBackground,
  View,
} from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotPassword = memo(() => {
  const { goBack } = useNavigation();
  const { height, width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <ImageBackground
        source={Images.frame}
        style={[
          {
            width: width - 74,
            height: height / 2.2,
            top: top + 48,
          },
          styles.imgbackground,
        ]}
      />
      <TopNavigation
        style={{ marginLeft: 12 }}
        accessoryLeft={() => {
          return (
            <NavigationAction
              icon="leftArrow"
              onPress={goBack}
              status="primary"
            />
          );
        }}
        title={() => {
          return (
            <Image
              source={Images.logo4}
              /* @ts-ignore */
              style={styles.image}
            />
          );
        }}
      />
      <KeyboardAwareScrollView style={styles.content} enableOnAndroid showsVerticalScrollIndicator={false}>
        <Image
          source={Images.chatbox}
          /* @ts-ignore */
          style={styles.chatbox}
        />
        <Text center category="title1" marginTop={91}>
          Forgot Password
        </Text>
        <Text
          marginHorizontal={64}
          marginTop={16}
          center
          category="body"
          status="placeholder"
        >
          Don’t worry, you can use magic link continue your login!
        </Text>
        <Input
          accessoryLeft={(props) => {
            return <Icon {...props} pack="assets" name="email" />;
          }}
          placeholder="Your email"
          status="primary"
          style={styles.input}
        />
        <Button size="large" children="Sign In" style={styles.button} />
      </KeyboardAwareScrollView>
      <View style={styles.bottom}>
        <Text
          children="New Account!"
          status="primary"
          category="title4"
          center
          paddingTop={8}
          paddingBottom={16}
        />
      </View>
    </Container>
  );
});

export default ForgotPassword;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    zIndex: 1,
  },
  imgbackground: {
    alignSelf: "center",
    position: "absolute",
  },
  bottom: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 16,
    width: "100%",
  },
  chatbox: {
    marginTop: 56,
    marginLeft: 24,
  },
  image: {
    height: 48,
    width: 48,
  },
  input: {
    marginHorizontal: 32,
    marginTop: 40,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 32,
  },
});
