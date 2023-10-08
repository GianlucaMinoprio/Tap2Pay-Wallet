import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import ChartBar from "./ChartBar";
import dayjs from "utils/dayjs";
import BottomAddFriend from "./BottomAddFriend";

const HomeFitness = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <View style={[styles.point, { top: top + 8 }]}>
        <Image source={Images.pointRun} />
        <Text
          children="35,000"
          marginLeft={8}
          category="title4"
          status="white"
        />
      </View>
      <Content
        contentContainerStyle={{ paddingTop: top, paddingBottom: bottom + 24 }}
      >
        <Image
          source={Images.guyRiding}
          /* @ts-ignore */
          style={styles.imgHeader}
        />
        <Text status="placeholder" center category="subhead">
          {/*  local time   */}
          {/* Today, {dayjs().format("MMMM DD, YYYY")} */}
          Today, December 03, 2020
        </Text>
        <View style={styles.stepView}>
          <Text category="header" status="white" center>
            3,248
          </Text>
          <Text category="body" status="snow" marginLeft={4} marginBottom={4}>
            Steps
          </Text>
        </View>
        <Button children="Run Now" style={styles.runNow} onPress={goBack} />
        <ChartBar data={data} setStep={setStep} dataSetStep={dataSetStep} />
        <BottomAddFriend data={DATA_Friend} />
      </Content>
    </Container>
  );
});

export default HomeFitness;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  imgHeader: {
    width: 57,
    height: 120,
    marginLeft: 32,
    marginVertical: 8,
  },
  point: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 14,
    zIndex: 10,
  },
  runNow: {
    marginHorizontal: 40,
    marginTop: 20,
  },
  stepView: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 6,
    alignSelf: "center",
  },
});
const setStep = 8000;
const stepMonday = 4000;
const stepTuesday = 5700;
const stepWednesday = 3284;
const stepThursday = 4500;
const stepFriday = 9000;
const stepSaturday = setStep;
const stepSunday = 2000;
const data = [
  { x: 1, y: 1, y0: stepSunday, date: "S" },
  { x: 2, y: 1, y0: stepMonday, date: "M" },
  { x: 3, y: 1, y0: stepTuesday, date: "T" },
  { x: 4, y: 1, y0: stepWednesday, date: "W" },
  { x: 5, y: 1, y0: stepThursday, date: "T" },
  { x: 6, y: 1, y0: stepFriday, date: "F" },
  { x: 7, y: 1, y0: stepSaturday, date: "S" },
];
const dataSetStep = [
  { x: 1, y: 1, y0: setStep, date: "S" },
  { x: 2, y: 1, y0: setStep, date: "M" },
  { x: 3, y: 1, y0: setStep, date: "T" },
  { x: 4, y: 1, y0: setStep, date: "W" },
  { x: 5, y: 1, y0: setStep, date: "T" },
  { x: 6, y: 1, y0: setStep, date: "F" },
  { x: 7, y: 1, y0: setStep, date: "S" },
];
const DATA_Friend = [Images.avatar7, Images.avatar8, Images.avatar9];
