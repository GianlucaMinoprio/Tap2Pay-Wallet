import React, { memo } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  Input,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Container from "components/Container";
import { Images } from "assets/images";
import CardSignIn from "components/CardSignIn";
import useLayout from "hooks/useLayout";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignIn01 = memo(() => {
  const { navigate, goBack } = useNavigation();
  const { top, bottom, width, height } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [hide, setHide] = React.useState(false);
  const handleCard = React.useCallback(() => {}, []);
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const accessoryRight = React.useCallback(() => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <Icon pack="assets" name="question" style={styles.topIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon
            marginLeft={16}
            pack="assets"
            name="headphone"
            style={styles.topIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={styles.container} level="1">
        <Layout
          level="4"
          style={[
            styles.layout,
            {
              paddingTop: top,
            },
          ]}
        >
          <TopNavigation
            style={{ backgroundColor: "transparent", paddingHorizontal: 24 }}
            accessoryLeft={() => (
              <Image
                source={Images.logo4}
                /* @ts-ignore */
                style={styles.icon}
              />
            )}
            accessoryRight={accessoryRight}
          />
          <View style={styles.topView}>
            <Text marginTop={12} marginBottom={16} category="title3">
              Welcome Back
            </Text>
            <Input
              status="basic"
              placeholder="Username"
              value={user}
              onChangeText={setUser}
              style={{ marginBottom: 16 }}
            />
            <Input
              secureTextEntry={hide}
              value={password}
              onChangeText={setPassword}
              status="basic"
              placeholder="Password"
              accessoryRight={(props) => (
                <TouchableOpacity
                  onPress={() => {
                    setHide(!hide);
                  }}
                >
                  <Icon
                    {...props}
                    pack="assets"
                    name={hide ? "eye" : "eyeHide"}
                  />
                </TouchableOpacity>
              )}
            />

            <View style={styles.bottomLayout}>
              <Text onPress={goBack} category="body" center>
                Forgot Password?
              </Text>

              <Button style={styles.button} size="large" children="Sign In" />
              <Button
                size="large"
                status="primary"
                accessoryRight={() => (
                  <Icon
                    pack="assets"
                    name="happyFace"
                    style={{
                      tintColor: theme["text-blue-color"],
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
              />
            </View>
          </View>
        </Layout>
        <FlatList
          data={SignIn01_Data}
          horizontal={false}
          contentContainerStyle={styles.flatList}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item, index }) => (
            <CardSignIn item={item} onPress={handleCard} />
          )}
        />
        <Button
          children="Create An Account!"
          status="transparent"
          size="tiny"
          onPress={goBack}
          style={styles.btnBottom}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
});

export default SignIn01;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  flatList: {
    alignItems: "center",
    paddingTop: 16,
  },
  btnBottom: {
    paddingBottom: 16,
  },
  bottomLayout: {
    flexDirection: "row",
    marginVertical: 24,
    alignItems: "center",
  },
  layout: {
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
  },
  topView: {
    marginHorizontal: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: {
    flexWrap: "wrap",
    flex: 1,
    alignSelf: "center",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginRight: 8,
    marginLeft: 28,
  },
  icon: {
    width: 48,
    height: 48,
  },
  topIcon: {
    tintColor: "icon-basic-color",
  },
});
export const SignIn01_Data = [
  {
    id: 0,
    title: "Create portfolios investment",
    image: Images.folderStar,
  },
  {
    id: 1,
    title: "Make complex financial ",
    image: Images.shieldTick,
  },
  {
    id: 2,
    title: "Grow up you portfolios",
    image: Images.target1,
  },
  {
    id: 3,
    title: "Saving more cashflow",
    image: Images.piggybank1,
  },
];
