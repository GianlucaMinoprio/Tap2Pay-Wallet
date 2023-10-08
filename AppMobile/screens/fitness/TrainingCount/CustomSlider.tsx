import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useTheme, StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { Slider } from "@miblanchard/react-native-slider";

interface Props {
  value: number;
  maxValue: number;
  time: string;
  style?: StyleProp<ViewStyle>;
}

const CustomSlider = ({ value, maxValue, time = "00:00", style }: Props) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  return (
    <View style={[styles.container, style]}>
      <Text status="white" category="header" style={styles.text}>
        {time}
      </Text>
      <Slider
        value={value}
        step={1}
        minimumValue={0}
        renderThumbComponent={() => null}
        maximumValue={maxValue}
        minimumTrackTintColor={theme["color-salmon-100"]}
        trackStyle={styles.track}
        maximumTrackTintColor={theme["background-basic-color-2"]}
        thumbTintColor={"transparent"}
      />
    </View>
  );
};

export default CustomSlider;

const themedStyles = StyleService.create({
  container: {},
  track: {
    height: 80,
  },
  text: {
    textAlign: "center",
    position: "absolute",
    zIndex: 10,
    left: 0,
    right: 0,
    justifyContent: "center",
  },
});
