import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useCountDown from "hooks/useCountDown";
import useLayout from "hooks/useLayout";

const Verify = memo(() => {
  const { top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const pressConfirm = React.useCallback(() => {}, []);
  const [time, reset] = useCountDown(30);
  return (
    <Container style={styles.container}>
      <TopNavigation
        appearance="default"
        style={[{ top: top }, styles.topNav]}
        accessoryRight={() => {
          return <NavigationAction icon={"cancel"} status="primary" />;
        }}
      />

      <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
        <Image
          source={Images.group10}
          /* @ts-ignore */
          style={[styles.image, { marginTop: top + 32 }]}
        />
        <Text
          marginLeft={32}
          category="title1"
          marginTop={34}
          marginBottom={16}
        >
          Verify User!
        </Text>
        <Text
          marginHorizontal={32}
          marginBottom={20}
          category="body"
          status="placeholder"
        >
          We have send code to your phone number and your email!
        </Text>
        <Input
          placeholder="Code from email"
          status="primary"
          style={styles.input}
          accessoryLeft={(props) => {
            return <Icon pack="assets" name="email" {...props} />;
          }}
          accessoryRight={() => {
            return (
              <Text
                category="subhead"
                status="placeholder"
                children="Resend"
                marginRight={8}
              />
            );
          }}
        />
        <Input
          placeholder="Code from phonenumber"
          status="primary"
          style={styles.input}
          accessoryLeft={(props) => {
            return <Icon {...props} pack="assets" name="smartphone" />;
          }}
          accessoryRight={() => {
            return (
              <Text
                category="subhead"
                status="placeholder"
                children="Resend"
                marginRight={8}
              />
            );
          }}
        />
      </KeyboardAwareScrollView>
      <View style={[styles.btn, { bottom: bottom + 16 }]}>
        <Text status="primary" category="body">
          Expried {time}s
        </Text>
        <Button
          onPress={pressConfirm}
          size="medium"
          children="Confirm"
          style={styles.confirm}
          accessoryRight={(props) => {
            return <Icon {...props} pack="assets" name="rightArrow" />;
          }}
        />
      </View>
    </Container>
  );
});

export default Verify;

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
  image: {
    alignSelf: "center",
  },
  input: {
    marginVertical: 12,
    marginHorizontal: 32,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 32,
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "transparent",
    position: "absolute",
  },
  confirm: {
    flex: 1,
    marginLeft: 90,
  },
});
