import React, { memo } from "react";
import {
  useWindowDimensions,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  Input,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import { SceneMap, TabView } from "react-native-tab-view";
import TabBar from "components/TabBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignIn04 = memo(() => {
  const { goBack } = useNavigation();
  const { height, width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [hide, setHide] = React.useState(true);
  const [index, setIndex] = React.useState(0);
  const SignInTab = () => {
    return (
        <KeyboardAwareScrollView style={styles.containerTab} enableOnAndroid showsVerticalScrollIndicator={false}>
          <Layout level={"4"} style={styles.layout}>
            <Image
              source={Images.hand}
              /* @ts-ignore */
              style={styles.image}
            />
            <Text category="title2" center children="Hi Guys!" />
            <Text
              category="body"
              center
              status="placeholder"
              children="Welcome back to system!"
            />
            <Input
              status="basic"
              style={{ marginTop: 24 }}
              placeholder="Username"
            />
            <Input
              status="basic"
              style={{ marginTop: 16 }}
              placeholder="Password"
              secureTextEntry={hide}
              accessoryRight={(props) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setHide(!hide);
                    }}
                  >
                    <Icon
                      {...props}
                      pack="assets"
                      name={hide ? "eye" : "eyeHide"}
                      style={styles.eye}
                    />
                  </TouchableOpacity>
                );
              }}
            />
            <Button
              children="Sign In"
              size="large"
              style={styles.signIn}
              onPress={goBack}
            />
            <Button
              size="large"
              status="success"
              accessoryLeft={() => (
                <Icon style={styles.happyFace} pack="assets" name="happyFace" />
              )}
            />
            <Text
              children="Forgot Password?"
              category="call-out"
              marginTop={75}
              marginBottom={32}
            />
          </Layout>
          <Text status="primary" marginTop={20} center marginBottom={24}>
            Continue with Guest
          </Text>
        </KeyboardAwareScrollView>
    );
  };
  const renderScene = SceneMap({
    first: SignInTab,
    second: SignInTab,
  });
  const [routes] = React.useState([
    { key: "first", title: "Sign In" },
    { key: "second", title: "Sign Up" },
  ]);
  return (
    <Container style={[styles.container]}>
      <View
        style={{
          position: "absolute",
          left: -50,
          top: top + 72,
          zIndex: 10,
        }}
      >
        <TabBar
          uppercase
          onChangeTab={setIndex}
          tabActive={index}
          status={["basic", "placeholder"]}
          category="title4"
          tabs={["sign up", "sign in"]}
          style={{
            marginLeft: 12,
            transform: [{ rotate: "270deg" }],
          }}
          tabStyle={styles.tabBar}
        />
      </View>

      <TabView
        showPageIndicator
        lazy
        lazyPreloadDistance={2000}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width }}
        style={styles.content}
        transitionStyle="scroll"
        renderTabBar={() => null}
      />
      <View style={{ position: "absolute", bottom: bottom + 52, zIndex: 10 }}>
        <TouchableOpacity style={styles.button}>
          <Icon pack="assets" name="facebook" style={styles.tintColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon pack="assets" name="gg" style={styles.tintColor} />
        </TouchableOpacity>
      </View>
    </Container>
  );
});

export default SignIn04;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 0,
  },
  containerTab: {
    flex: 1,
    marginTop: 48,
  },
  layout: {
    borderRadius: 16,
    alignItems: "center",
    marginRight: 16,
    paddingHorizontal: 24,
  },
  signIn: {
    marginTop: 24,
    marginBottom: 24,
    width: "100%",
  },
  tintColor: {
    tintColor: "white",
  },
  leftView: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingLeft: 64,
  },
  happyFace: {
    width: 19,
    height: 19,
    tintColor: "text-basic-color",
  },
  image: {
    alignSelf: "center",
    marginVertical: 32,
  },
  button: {
    backgroundColor: "transparent",
    height: 48,
    width: 48,
    alignItems: "center",
  },
  eye: {
    width: 16,
    height: 16,
    tintColor: "text-blue-color",
    marginRight: 8,
  },
  tabBar: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    marginLeft: 24,
  },
});
