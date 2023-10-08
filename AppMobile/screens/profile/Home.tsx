import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { RootStackParamList } from "navigation/type";
import AdMob from "components/AdMob";

const Home = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  interface Props {
    title:
      | "Home"
      | "Profile01"
      | "Profile02"
      | "Profile03"
      | "Profile04"
      | "Profile05"
      | "Profile06"
      | "Profile07"
      | "Profile08"
      | "Profile09"
      | "Profile10";
  }
  const Item = ({ title }: Props) => {
    return (
      <Button
        style={styles.item}
        children={title}
        onPress={() => navigate("Profile", { screen: title })}
      />
    );
  };

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} title="Profile" />
      <Content contentContainerStyle={styles.content}>
        <Item title="Profile01" />
        <Item title="Profile02" />
        <Item title="Profile03" />
        <Item title="Profile04" />
        <Item title="Profile05" />
        <AdMob marginTop={16} />
        <Item title="Profile06" />
        <Item title="Profile07" />
        <Item title="Profile08" />
        <Item title="Profile09" />
        <Item title="Profile10" />
      </Content>
    </Container>
  );
});

export default Home;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  item: {
    marginTop: 12,
  },
  content: {
    paddingBottom: 90,
  },
});
