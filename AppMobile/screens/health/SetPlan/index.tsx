import React, { memo } from "react";
import { View, FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import { Images } from "assets/images";
import keyExtractor from "utils/keyExtractor";
import PlanItem from "./PlanItem";
import NavigationAction from "components/NavigationAction";

const SetPlan = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const renderItem = React.useCallback(({ item }) => {
    return <PlanItem item={item} />;
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={[styles.topNav, { paddingTop: top - 8 }]}
        accessoryLeft={
          <Text category="title4" status="white" marginLeft={16}>
            Plans
          </Text>
        }
        accessoryRight={
          <View style={styles.rightTopNav}>
            <NavigationAction marginRight={-8} icon="menu" size="giant" />
            <NavigationAction icon="search" marginRight={4} size="giant" />
          </View>
        }
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: bottom + 32 }]}
      />
    </Container>
  );
});

export default SetPlan;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    paddingTop: 0,
  },
  topNav: {
    marginBottom: -10,
  },
  rightTopNav: {
    flexDirection: "row",
    marginBottom: 4,
  },
  content: {
    marginTop: 8,
  },
});
const data = [
  {
    id: 0,
    level: "5",
    title: "Food For Strengs",
    titleButton: "Be Strongs",
    description: "Get strong with food plans",
    image: Images.beStrong,
  },
  {
    id: 1,
    level: "8",
    title: "Food For Mind",
    titleButton: "Be Smarts",
    description: "Get strong with food plans",
    image: Images.beSmart,
  },
  {
    id: 2,
    level: "6",
    title: "Food For Nice",
    titleButton: "Be Nice",
    description: "Get strong with food plans",
    image: Images.beNice,
  },
  {
    id: 3,
    level: "4",
    title: "Food For Strengs",
    titleButton: "Be Fly",
    description: "Get strong with food plans",
    image: Images.beFly,
  },
];
