import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "navigation/type";
import Container from "components/Container";
import { Button, TopNavigation } from "@ui-kitten/components";
import NavigationAction from "components/NavigationAction";
import Content from "components/Content";
import AdMob from "components/AdMob";

interface ItemProp {
  title:
    | "Home"
    | "SignUp"
    | "SignIn"
    | "ForgotPassword"
    | "Verify"
    | "Authenticate"
    | "CreateNewProfile";
}
const Home = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<RootStackParamList>>();

  const RenderItem = ({ title }: ItemProp) => {
    return (
      <Button
        children={title}
        style={styles.button}
        onPress={() => navigate("Auth", { screen: title })}
      ></Button>
    );
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction onPress={goBack} />}
        title="AuthNavigator"
      />
      <Content>
        <View style={styles.content}>
          <RenderItem title="SignUp" />
          <RenderItem title="SignIn" />
        </View>
      </Content>
    </Container>
  );
});

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 90,
  },
  button: {
    width: "80%",
    marginTop: 16,
  },
});
