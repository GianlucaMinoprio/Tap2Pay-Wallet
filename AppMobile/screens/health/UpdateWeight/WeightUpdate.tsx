import React from "react";
import { View } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Button,
} from "@ui-kitten/components";

import Text from "components/Text";
import ProgressBar from "components/ProgressBar";

interface Props {
  goalWeight: number;
  weight: number;
  onPress?(): void;
}

const WeightUpdate = ({ goalWeight, weight, onPress }: Props) => {
  let weight_target = 5;
  let bar_target = goalWeight - weight;
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout style={styles.container}>
      <View style={styles.topView}>
        <Text category="title4" status="white">
          GOAL WEIGHT
        </Text>
        <Text category="title3" status="white">{`${goalWeight}kgs`}</Text>
      </View>
      <Text status="grey500" category="body" marginTop={2}>{`You’ve lost ${(
        goalWeight - weight
      ).toFixed(1)} kgs`}</Text>
      <ProgressBar
        didDone={bar_target}
        total={weight_target}
        style={styles.bar}
        styleBar={styles.progressBar}
      />
      <View style={styles.weightView}>
        <Text category="headline">{weight}</Text>
        <Text category="headline" opacity={0.5}>
          {goalWeight}
        </Text>
      </View>
      <Button
        children="Update Weight"
        size="48"
        style={styles.btn}
        onPress={onPress}
      />
    </Layout>
  );
};

export default WeightUpdate;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 8,
    backgroundColor: "color-basic-1000",
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 18,
    marginHorizontal: 24,
  },
  topView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bar: {
    backgroundColor: "#516287",
    marginBottom: 4,
    marginTop: 44,
  },
  weightView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  progressBar: {
    backgroundColor: "color-basic-100",
  },
  btn: {
    borderRadius: 24,
  },
});
