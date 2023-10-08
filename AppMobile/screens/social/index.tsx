import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { TopNavigation, Button } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { RootStackParamList } from "navigation/type";
import AdMob from "components/AdMob";

interface ItemProps {
  title:
    | "Home"
    | "NewFeed"
    | "ViewPhoto"
    | "SearchScr"
    | "HomeRaise"
    | "Story"
    | "FindFriend"
    | "Contact"
    | "Conversation"
    | "SendPhotoVoice"
    | "VideoCall";
}
const Home = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const RenderItem = ({ title }: ItemProps) => {
    return (
      <Button
        children={title}
        style={styles.button}
        onPress={() => navigate("Social", { screen: title })}
      />
    );
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        title="Social"
      />
      <Content contentContainerStyle={styles.content}>
        <RenderItem title="NewFeed" />
        <RenderItem title="SearchScr" />
        <RenderItem title="ViewPhoto" />
        <RenderItem title="HomeRaise" />
        <RenderItem title="Story" />
        <AdMob marginTop={16} />
        <RenderItem title="FindFriend" />
        <RenderItem title="Contact" />
        <RenderItem title="Conversation" />
        <RenderItem title="SendPhotoVoice" />
        <RenderItem title="VideoCall" />
      </Content>
    </Container>
  );
});

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  button: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 12,
  },
  content: {
    paddingBottom: 90,
  },
});
