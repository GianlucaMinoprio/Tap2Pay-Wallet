import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
  Input,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import TabBar from "components/TabBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUp01 = memo(() => {
  const { goBack } = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Container style={[styles.container, { paddingBottom: bottom + 8 }]}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction status="primary" />}
        style={{ marginLeft: 12, marginRight: 24 }}
        accessoryRight={() => {
          return (
            <TouchableOpacity onPress={goBack}>
              <Image
                source={Images.logo4}
                /* @ts-ignore */
                style={styles.image}
              />
            </TouchableOpacity>
          );
        }}
      />

      <KeyboardAwareScrollView
        extraHeight={30}
        enableOnAndroid
        extraScrollHeight={30}
        showsVerticalScrollIndicator={false}
      >
        <Text marginTop={24} center category="title2">
          Sign Up Now
        </Text>
        <TabBar
          onChangeTab={setActiveTab}
          tabActive={activeTab}
          backgroundTab={theme["background-basic-color-2"]}
          backgroundTabActive={theme["color-primary-100"]}
          style={styles.tabBar}
          tabs={["Freelancer", "Hirer"]}
        />
        <Button
          activeOpacity={0.55}
          style={styles.facebook}
          status="success"
          children="Continue with Facebook"
          accessoryLeft={() => {
            return <Icon pack="assets" name="facebook" style={styles.icon} />;
          }}
        />
        <Button
          activeOpacity={0.55}
          style={styles.btnGG}
          status="success"
          children="Continue with Google"
          accessoryLeft={() => {
            return (
              <Icon
                animation="pulse"
                pack="assets"
                name="gg"
                style={styles.icon}
              />
            );
          }}
        />
        <View style={styles.middleView}>
          <Layout style={styles.line} level="2" />
          <Text
            center
            category="body"
            status="placeholder"
            marginVertical={48}
            marginHorizontal={16}
          >
            Or Signup with Email
          </Text>
          <Layout style={styles.line} level="2" />
        </View>

        <Input
          style={styles.input}
          status="primary"
          placeholder="Email/Phonenumber"
          accessoryLeft={(props) => (
            <Icon {...props} pack="assets" name={"user"} />
          )}
        />
        <Button children="Sign In" style={styles.signIn} />
      </KeyboardAwareScrollView>
      <View style={styles.bottom}>
        <Text children="SIGN IN" status="primary" center onPress={goBack} />
      </View>
    </Container>
  );
});

export default SignUp01;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  bottom: {
    position: "absolute",
    bottom: 8,
    width: "100%",
  },
  input: {
    paddingHorizontal: 32,
  },
  image: {
    width: 48,
    height: 48,
  },
  tabBar: {
    marginHorizontal: 80,
  },
  line: {
    height: 1,
    flex: 1,
  },
  facebook: {
    backgroundColor: "#6979F8",
    marginHorizontal: 32,
    justifyContent: "flex-start",
    marginTop: 40,
    marginBottom: 24,
  },
  icon: {
    tintColor: "color-basic-100",
    marginRight: 32,
    marginLeft: 16,
  },
  btnGG: {
    backgroundColor: "#FF647C",
    marginHorizontal: 32,
    justifyContent: "flex-start",
  },
  middleView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  signIn: {
    marginHorizontal: 32,
    marginTop: 24,
  },
});
