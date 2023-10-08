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
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  interface Props {
    title:
      | "Home"
      | "HomeFitness"
      | "SelectGender"
      | "WorkoutPlans"
      | "Running"
      | "ConditionHeatMap"
      | "WorkoutList"
      | "TrainingCount"
      | "SetPlan"
      | "Achievements"
      | "Activity";
  }
  const Item = ({ title }: Props) => {
    return (
      <Button
        style={styles.item}
        children={title}
        onPress={() => navigate("Fitness", { screen: title })}
      />
    );
  };

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} title="Fitness" />
      <Content contentContainerStyle={styles.content}>
        <Item title="HomeFitness" />
        <Item title="SelectGender" />
        <Item title="WorkoutPlans" />
        <Item title="Running" />
        <Item title="ConditionHeatMap" />
        <AdMob marginTop={16} />
        <Item title="WorkoutList" />
        <Item title="TrainingCount" />
        <Item title="SetPlan" />
        <Item title="Achievements" />
        <Item title="Activity" />
      </Content>
    </Container>
  );
});

export default Home;

const themedStyles = StyleService.create({
  container: {
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  item: {
    marginTop: 12,
  },
});
