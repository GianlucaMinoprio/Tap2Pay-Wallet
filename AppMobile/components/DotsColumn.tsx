import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
  StyleProp,
} from "react-native";
import { useTheme } from "@ui-kitten/components";

import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

interface DotsProps<T> {
  translationValue: Animated.SharedValue<number>;
  data: Array<T>;
  heightInterpolate: number;
  heightItem: number;
  style?: StyleProp<ViewStyle>;
}
function DotsColumn<T>({
  data,
  translationValue,
  heightInterpolate = 8,
  style,
  heightItem = 332,
}: DotsProps<T>) {
  const theme = useTheme();
  return (
    <View style={[styles.container, style]}>
      {data.map((_, i) => {
        const dotColor = useDerivedValue(() => {
          return interpolateColor(
            translationValue.value,
            [
              (i - 1) * heightItem,
              i * heightItem,
              (i + 1) * heightItem,
              (i + 2) * heightItem,
            ],
            [
              theme["dot-basic-color"],
              theme["color-primary-100"],
              theme["dot-basic-color"],
              theme["dot-basic-color"],
            ]
          );
        });

        const dotHeight = useDerivedValue(() => {
          return interpolate(
            translationValue.value,
            [
              (i - 1) * heightItem,
              i * heightItem,
              (i + 1) * heightItem,
              (i + 2) * heightItem,
            ],

            [6, heightInterpolate, 6, 6],
            Extrapolate.CLAMP
          );
        });

        const dotStyle = useAnimatedStyle(() => {
          return {
            backgroundColor: dotColor.value,
            height: dotHeight.value,
          };
        });

        return (
          <Animated.View key={i.toString()} style={[styles.dot, dotStyle]} />
        );
      })}
    </View>
  );
}

export default DotsColumn;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 8,
    marginVertical: 4,
  },
});
