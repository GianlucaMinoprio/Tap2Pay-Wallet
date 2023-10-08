import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@ui-kitten/components";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

interface AnimatedStepProps {
  step: number;
  style?: StyleProp<ViewStyle>;
}

const AnimatedStep = ({ step, style }: AnimatedStepProps) => {
  const theme = useTheme();

  const Step = React.useCallback(
    ({ start, active }: { start?: boolean; active?: boolean }) => {
      const [width, setWidth] = React.useState<number>(1);

      const onLayout = React.useCallback(({ nativeEvent }) => {
        setWidth((prev) => {
          if (prev !== nativeEvent.layout.width) {
            return nativeEvent.layout.width;
          }
          return prev;
        });
      }, []);

      const progress = useDerivedValue(() => {
        return active ? withTiming(1) : withTiming(0);
      }, [active]);

      const style = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
          progress.value,
          [0, 0.99, 1],
          [
            theme["color-basic-1300"],
            theme["color-basic-1300"],
            theme["color-primary-100"],
          ]
        );

        return {
          backgroundColor: backgroundColor,
        };
      });

      const lineStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
          progress.value,
          [0, 1],
          [theme["color-basic-1300"], theme["color-primary-100"]]
        );

        const widthX = interpolate(progress.value, [0, 1], [0, width]);

        return {
          flex: 1,
          width: widthX,
          backgroundColor: backgroundColor,
        };
      });

      return (
        <View
          style={[
            styles.step,
            {
              flex: start ? 0 : 1,
            },
          ]}
        >
          <View
            onLayout={onLayout}
            style={[
              styles.line,
              { backgroundColor: theme["color-basic-1300"] },
            ]}
          >
            <Animated.View style={lineStyle} />
          </View>
          <Animated.View style={[styles.dot, style]} />
        </View>
      );
    },
    []
  );

  return (
    <View style={[styles.container, style]}>
      <Step start={true} active />
      <Step active={step >= 1} />
      <Step active={step >= 2} />
      <Step active={step >= 3} />
    </View>
  );
};

export default AnimatedStep;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 64,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  line: {
    height: 2,
    flex: 1,
  },
});
