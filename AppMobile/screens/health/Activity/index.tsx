import React, { memo } from "react";
import { Image, ScrollView } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import AnimatedAppearance from "components/AnimatedAppearance";
import Chart from "../HomeHealth/Chart";
import { Data_Weight } from "../HomeHealth/data";

const Activity = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={<NavigationAction icon={"menu"} marginRight={4} />}
      />
      <AnimatedAppearance>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: bottom + 104 }}
        >
          <Text category="title2" status="white" marginLeft={16}>
            Keep it up!{"\n"}Tracked your heath.
          </Text>
          <Chart
            strokeColor={theme["color-primary-100"]}
            data={Data_Weight}
            style={styles.cardWeight}
            title={"weight"}
            haveRightArrow
          />
          <Chart
            strokeColor={theme["color-emerald-100"]}
            data={Data_Water}
            style={styles.cardWater}
            title={"Water"}
            haveRightArrow
          />
          <Chart
            strokeColor={theme["color-radical-600"]}
            data={Data_Exercise}
            style={styles.cardExercise}
            title={"Exercise"}
            haveRightArrow
          />
        </ScrollView>
      </AnimatedAppearance>
      <Layout style={[styles.bottomTab, { paddingBottom: bottom }]}>
        <NavigationAction icon="calendar" status="snow" size="medium" />
        <NavigationAction icon="beachHouse" status="snow" size="medium" />
        <Image
          source={Images.logo4}
          /* @ts-ignore */
          style={styles.logo}
        />
        <NavigationAction icon="fire" status="snow" size="medium" />
        <NavigationAction icon="user" status="primary" size="medium" />
      </Layout>
    </Container>
  );
});

export default Activity;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  cardWeight: {
    marginTop: 32,
  },
  cardWater: {
    marginTop: 24,
  },
  cardExercise: {
    marginTop: 24,
    marginBottom: 24,
  },
  bottomTab: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 12,
    alignItems: "center",
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "color-basic-1000",
  },
  logo: {
    width: 24,
    height: 20.71,
  },
});
export const Data_Water = [
  { x: 1.1, y: 120, date: "S", step: "10" },
  { x: 1.2, y: 115, step: "" },
  { x: 1.5, y: 90, step: "2" },
  { x: 2, y: 120, date: "M", step: "2" },
  { x: 2.6, y: 80, date: "T", step: "5" },
  { x: 3, y: 100, step: "2" },
  { x: 3.1, y: 90, step: "2" },
  { x: 3.2, y: 52, date: "W", step: "2" },
  { x: 3.5, y: 92, step: "2" },
  { x: 3.8, y: 102, date: "T", step: "2" },
  { x: 4.4, y: 52, step: "2" },
  { x: 4.8, y: 60, date: "F", step: "2" },
  { x: 5.2, y: 60, step: "2" },
  { x: 5.3, y: 50, date: "S", step: "2" },
];
export const Data_Exercise = [
  { x: 1.1, y: 120, date: "S", step: "1" },
  { x: 1.2, y: 115, step: "10" },
  { x: 1.5, y: 90, step: "2" },
  { x: 2, y: 120, date: "M", step: "2" },
  { x: 2.6, y: 80, date: "T", step: "2" },
  { x: 3, y: 100, step: "2" },
  { x: 3.1, y: 90, step: "2" },
  { x: 3.2, y: 52, date: "W", step: "2" },
  { x: 3.5, y: 92, step: "2" },
  { x: 3.8, y: 102, date: "T", step: "2" },
  { x: 4.4, y: 52, step: "2" },
  { x: 4.8, y: 60, date: "F", step: "2" },
  { x: 5.2, y: 60, step: "2" },
  { x: 5.3, y: 50, date: "S", step: "2" },
];
