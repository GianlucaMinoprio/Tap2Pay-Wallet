import React, { memo } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import InputCodeOtp from "components/InputCodeOtp";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useCountDown from "hooks/useCountDown";
import useLayout from "hooks/useLayout";
import { useNavigation } from "@react-navigation/native";

const Authenticate = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { top } = useLayout();
  const { goBack } = useNavigation();
  const [time, reset] = useCountDown(30);
  const [code, setCode] = React.useState("");
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={[{ top: top }, styles.topNav]}
        accessoryRight={() => {
          return <NavigationAction icon={"cancel"} status="primary" />;
        }}
      />
      <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
        <Image
          source={Images.group3}
          /* @ts-ignore */
          style={[styles.image, { marginTop: top + 32 }]}
        />
        <Text marginTop={12} marginBottom={8} center category="title2">
          Authenticate Account
        </Text>
        <Text
          category="body"
          status="placeholder"
          marginHorizontal={32}
          marginBottom={24}
          center
        >
          User authentication for each device ensures that the individual using
          the device is recognized by the company
        </Text>
        <InputCodeOtp
          style={styles.enterCode}
          {...{ code, setCode }}
          codeLength={5}
          autoFocus
        />
        <Button children="Submit" style={styles.btnSubmit} />
        <TouchableOpacity style={styles.cooldown} onPress={reset}>
          <Icon pack="assets" name="refresh" style={styles.refes} />
          <Text
            status="placeholder"
            category="call-out"
            marginLeft={8}
            children={`${time}s resend code`}
          />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <Text
        children="Create an Account!"
        status="primary"
        category="title4"
        center
        onPress={goBack}
        paddingBottom={16}
      />
    </Container>
  );
});

export default Authenticate;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    marginRight: 12,
    backgroundColor: "transparent",
    position: "absolute",
    width: "100%",
    zIndex: 10,
  },
  cooldown: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 24,
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
  },
  enterCode: {
    flexDirection: "row",
  },
  btnSubmit: {
    marginHorizontal: 36,
    marginTop: 32,
  },
  refes: {
    width: 16,
    height: 16,
    tintColor: "text-placeholder-color",
  },
});
