import React from "react";
import { View } from "react-native";
import { useTheme, StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { Slider } from "@miblanchard/react-native-slider";

interface Props {
  value: number;
  maxValue: number;
  onSlidingComplete: (value: number | Array<number>) => void;
  onSlidingStart: (value: number | Array<number>) => void;
  onValueChange: (value: number | Array<number>) => void;
}

const CustomSlider = ({
  value,
  maxValue,
  onSlidingComplete,
  onSlidingStart,
  onValueChange,
}: Props) => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [time, setTime] = React.useState("");
  const [maxTime, setMaxTime] = React.useState("");
  const [minutes, setMinutes] = React.useState(0);
  const [second, setSecond] = React.useState("");

  React.useEffect(() => {
    let y = value - (value % 60000);
    let x = Math.floor(y / 60000);
    let z = (value % 60000) / 1000;
    setMinutes(x);
    setSecond(z.toFixed(0));
    return setTime(
      `${minutes >= 10 ? `${minutes.toFixed(0)}` : `0${minutes}`}:${
        z <= 9.5 ? "0" : ""
      }${second}`
    );
  }, [value, second, minutes]);
  React.useEffect(() => {
    let y = maxValue - (maxValue % 60000);
    let x = Math.floor(y / 60000);
    return setMaxTime(
      `${x >= 10 ? `${x.toFixed(0)}` : `0${x}`}:${
        (maxValue % 60000) / 1000 <= 9.6 ? "0" : ""
      }${((maxValue % 60000) / 1000).toFixed(0)}`
    );
  }, [maxValue]);
  return (
    <View style={styles.container}>
      <Slider
        value={value}
        step={1}
        minimumValue={0}
        maximumValue={maxValue}
        minimumTrackTintColor={theme["color-salmon-600"]}
        trackStyle={{ width: width - 48 }}
        maximumTrackTintColor={theme["background-basic-color-2"]}
        thumbTintColor={theme["color-salmon-600"]}
        thumbStyle={styles.thumbStyle}
        onSlidingStart={onSlidingStart}
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
      />
      <View style={styles.time}>
        <Text category="caption1" status="white">
          {time}
        </Text>
        <Text category="caption1" status="white">
          {maxTime}
        </Text>
      </View>
    </View>
  );
};

export default CustomSlider;

const themedStyles = StyleService.create({
  container: {
    alignItems: "center",
    marginTop: 24,
  },
  time: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  thumbStyle: {
    width: 12,
    height: 12,
  },
});
