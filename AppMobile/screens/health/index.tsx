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

interface ItemProp {
  title:
    | "Home"
    | "HomeHealth"
    | "UpdateWeight"
    | "WaterGoal"
    | "AddFoodLunch"
    | "FoodInformation"
    | "AddFoodBreakfast"
    | "Recipes"
    | "SetPlan"
    | "PlanDetails"
    | "Activity";
}

const Home = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const RenderItem = ({ title }: ItemProp) => {
    return (
      <Button
        style={styles.button}
        children={`${title}`}
        onPress={() => navigate("Health", { screen: title })}
      />
    );
  };
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} title="Health" />
      <Content contentContainerStyle={[styles.content]}>
        <RenderItem title="HomeHealth" />
        <RenderItem title="UpdateWeight" />
        <RenderItem title="WaterGoal" />
        <RenderItem title="AddFoodLunch" />
        <RenderItem title="FoodInformation" />
        <RenderItem title="AddFoodBreakfast" />
        <AdMob marginBottom={16} />
        <RenderItem title="Recipes" />
        <RenderItem title="SetPlan" />
        <RenderItem title="PlanDetails" />
        <RenderItem title="Activity" />
      </Content>
    </Container>
  );
});

export default Home;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: "center",
    paddingBottom: 90,
    marginHorizontal: 24,
  },
  button: {
    marginBottom: 16,
  },
});
