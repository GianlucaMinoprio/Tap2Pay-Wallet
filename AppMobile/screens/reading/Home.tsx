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
      | "HomeReading"
      | "ListBook"
      | "BookDetails"
      | "ListenBook"
      | "Question"
      | "BookMarkCollection"
      | "BookMarkList"
      | "Checkout"
      | "OrderTracking"
      | "HomeBook";
  }
  const Item = ({ title }: Props) => {
    return (
      <Button
        style={styles.item}
        children={title}
        onPress={() => navigate("Reading", { screen: title })}
      />
    );
  };

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} title="Profile" />
      <Content contentContainerStyle={styles.content}>
        <Item title="HomeReading" />
        <Item title="ListBook" />
        <Item title="BookDetails" />
        <Item title="Question" />
        <Item title="ListenBook" />
        <Item title="BookMarkCollection" />
        <AdMob marginTop={16} />
        <Item title="BookMarkList" />
        <Item title="Checkout" />
        <Item title="OrderTracking" />
        <Item title="HomeBook" />
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
