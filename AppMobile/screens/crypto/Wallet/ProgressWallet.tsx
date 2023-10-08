import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";

import { VictoryPie } from "victory-native";
import Svg, { Circle } from "react-native-svg";
import { ReText } from "react-native-redash";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AnimatedAppearance from "components/AnimatedAppearance";

interface Props {
  progressValue: number;
  data: any[];
}

const ProgressWallet = memo(({ progressValue, data }: Props) => {
  const styles = useStyleSheet(themedStyles);

  const chartRadius = 260 / 2;
  const strokeWidth = 20;

  const progress = useSharedValue(0);
  React.useEffect(() => {
    progress.value = withTiming(
      progressValue / 100 > 0 ? progressValue / 100 : 0,
      {
        duration: 1200,
        easing: Easing.bezier(0.1, 0.3, 0.5, 1),
      }
    );
  }, [progress.value]);

  const progressText = useDerivedValue(() => {
    return `${(progress.value * 100).toFixed(2)}%`;
  }, [progress.value]);

  return (
    <AnimatedAppearance>
      <View style={styles.container}>
        <VictoryPie
          width={chartRadius * 2}
          height={chartRadius * 2}
          padding={0}
          cornerRadius={6}
          innerRadius={chartRadius - strokeWidth}
          labelPosition="centroid"
          padAngle={2}
          animate={{ duration: 1200, easing: "circle" }}
          colorScale={["#F0DF67", "#4B9BAE", "rgba(33, 81, 144, 1)"]}
          data={data}
          standalone
          startAngle={-70}
          labels={undefined}
        />
        <Svg
          height={`${chartRadius * 2}`}
          width={`${chartRadius * 2}`}
          style={{ position: "absolute" }}
        >
          <Circle
            cx={`${chartRadius}`}
            cy={`${chartRadius}`}
            r={`${chartRadius - 32}`}
            strokeDashoffset={10}
            fill="transparent"
            strokeDasharray={[10]}
            stroke={"#29FF24"}
            strokeWidth={1}
          />
        </Svg>
        <View style={styles.progress}>
          <Icon
            pack="assets"
            name={progressValue >= 0 ? "grow" : "down"}
            style={styles.iconGrow}
          />
          <ReText style={styles.reText} text={progressText} />
        </View>
      </View>
    </AnimatedAppearance>
  );
});

export default ProgressWallet;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  progress: {
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  reText: {
    fontSize: 32,
    fontFamily: "Overpass-Bold",
    color: "#FFFFFF",
  },
  iconGrow: {
    width: 16,
    height: 12,
    marginRight: 4,
  },
});
