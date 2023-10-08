import React, { memo } from "react";
import { View, Image, Dimensions } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Input,
  Icon,
  Button,
  CheckBox,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import TabBar from "components/TabBar";
import { SceneMap, TabView } from "react-native-tab-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useLayout from "hooks/useLayout";

const initialLayout = { width: Dimensions.get("window").width };

const SignUp02 = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [index, setIndex] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const SignInTab = React.useCallback(() => {
    return (
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
        <Layout level="4" style={styles.layout}>
          <Text center category="title1" marginTop={24}>
            Welcome to Metmoi
          </Text>
          <Input
            placeholder="Your email"
            style={styles.input}
            accessoryLeft={(props) => (
              <Icon
                {...props}
                style={styles.icon}
                pack="assets"
                name={"email"}
              />
            )}
          />
          <Input
            accessoryLeft={() => (
              <Icon style={styles.icon} pack="assets" name={"padLock"} />
            )}
            placeholder="Password"
            style={styles.input}
          />
          <Button children="Sign In" style={styles.button} />
        </Layout>
      </KeyboardAwareScrollView>
    );
  }, []);
  const SignUpTab = React.useCallback(() => {
    return (
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
        <Layout style={styles.layout} level="4">
          <Input
            style={styles.input}
            placeholder="Username"
            accessoryLeft={() => (
              <Icon style={styles.icon} pack="assets" name={"user"} />
            )}
          />
          <Input
            placeholder="Your email"
            style={styles.input}
            accessoryLeft={() => (
              <Icon style={styles.icon} pack="assets" name={"email"} />
            )}
          />
          <Input
            accessoryLeft={() => (
              <Icon style={styles.icon} pack="assets" name={"padLock"} />
            )}
            placeholder="Password"
            style={styles.input}
          />
          <Input
            accessoryLeft={() => (
              <Icon style={styles.icon} pack="assets" name={"openPadLock"} />
            )}
            placeholder="Re Password"
            style={styles.input}
          />
          <Button children="Sign Up Now" style={styles.button} />
        </Layout>
      </KeyboardAwareScrollView>
    );
  }, []);
  const LazyPlaceholder = React.useCallback(
    () => (
      <View style={styles.scene}>
        <Text category="title4">Loading…</Text>
      </View>
    ),
    []
  );
  const renderScene = SceneMap({
    first: SignUpTab,
    second: SignInTab,
  });
  const [routes] = React.useState([
    { key: "first", title: "SignUp" },
    { key: "second", title: "SignIn" },
  ]);

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={{ marginHorizontal: 24 }}
        accessoryLeft={() => (
          <NavigationAction
            icon="leftArrow"
            status="basic"
            backgroundColor={theme["background-basic-color-5"]}
            size="large"
          />
        )}
        accessoryRight={() => {
          return (
            <Image
              source={Images.logo4}
              /* @ts-ignore */
              style={styles.logo}
            />
          );
        }}
      />

      <TabBar
        uppercase
        onChangeTab={setIndex}
        tabActive={index}
        status={["white", "placeholder"]}
        category="title4"
        style={{
          width: width / 2,
          marginLeft: 16,
        }}
        // style={styles.tabBar}

        tabs={["sign up", "sign in"]}
      />
      <TabView
        showPageIndicator
        lazy
        lazyPreloadDistance={2000}
        navigationState={{ index, routes }}
        renderLazyPlaceholder={({ route }) => <LazyPlaceholder />}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.content}
        transitionStyle="scroll"
        renderTabBar={() => null}
      />

      <View style={styles.btn}>
        <CheckBox
          checked={checked}
          onChange={(nextChecked) => setChecked(nextChecked)}
        />
        <View style={styles.bottom}>
          <Text category="subhead" center status="placeholder">
            By continuing, you agree to Metmoi UI KIT
          </Text>
          <Text status="white" category="subhead">
            Term of Use
            <Text
              children=" and confirm that you have read"
              category="subhead"
              center
              status="placeholder"
            />
          </Text>
          <Text
            center
            status="white"
            children=" Pricacy Policy. "
            category="subhead"
          />
        </View>
      </View>
    </Container>
  );
});

export default SignUp02;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 48,
    height: 48,
  },
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 32,
    marginBottom: 24,
  },
  layout: {
    marginTop: 32,
    marginHorizontal: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  input: {
    marginTop: 24,
  },
  content: {
    flex: 1,
  },
  btn: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  icon: {
    width: 16,
    height: 16,
    marginLeft: 8,
    tintColor: "icon-input-basic-color",
  },
  bottom: {
    marginLeft: 16,
  },
});
