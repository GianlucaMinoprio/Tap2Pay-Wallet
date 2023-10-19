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
    | "Onboarding"
    | "Onboarding01"
    | "Onboarding02"
    | "Onboarding03"
    | "Onboarding04"
    | "Onboarding05"
    | "Onboarding06"
    | "Onboarding07"
    | "Onboarding08"
    | "Onboarding09"
    | "Onboarding10";
}
const Onbroading = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<RootStackParamList>>();

  const RenderItem = ({ title }: ItemProp) => {
    return (
      <Button
        children={title}
        style={styles.button}
        onPress={() => navigate("Onbroading", { screen: title })}
      />
    );
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction onPress={goBack} />}
        title="Onbroading"
      />
      <Content contentContainerStyle={styles.content}>
        <RenderItem title="Onboarding04" />
        <AdMob marginTop={16} />
      </Content>
    </Container>
  );
});
export default Onbroading;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: "center",
    paddingBottom: 90,
    marginHorizontal: 24,
  },
  button: {
    marginTop: 12,
  },
});
