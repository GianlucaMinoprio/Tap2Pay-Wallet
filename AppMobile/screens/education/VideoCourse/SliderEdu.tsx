import React from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";
import { Slider } from "@miblanchard/react-native-slider";

interface Props {
  value: number;
  maxValue: number;
  time: string;
  totalTime: string;
  style?: StyleProp<ViewStyle>;
  _onFullScreen?(): void;
}

const SliderEdu = ({
  value,
  maxValue,
  time = "00:00",
  style,
  totalTime,
  _onFullScreen,
}: Props) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity activeOpacity={0.7} onPress={_onFullScreen}>
        <Icon pack="assets" name="fullscreen" style={styles.icon} />
      </TouchableOpacity>
      <Slider
        value={value}
        step={1}
        minimumValue={0}
        renderThumbComponent={() => (
          <Icon pack="assets" name="thumb" style={styles.thumb} />
        )}
        maximumValue={maxValue}
        minimumTrackTintColor={theme["color-primary-100"]}
        trackStyle={styles.track}
        maximumTrackTintColor={theme["background-basic-color-7"]}
      />
      <View style={styles.duration}>
        <Text status="white" category="caption1">
          {time}
        </Text>
        <Text status="white" category="caption1">
          {totalTime}
        </Text>
      </View>
    </View>
  );
};

export default SliderEdu;

const themedStyles = StyleService.create({
  container: {
    marginHorizontal: 24,
  },
  icon: {
    width: 16,
    height: 16,
    marginBottom: -8,
    alignSelf: "flex-end",
  },
  track: {
    height: 4,
  },
  duration: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -12,
  },
  thumb: {
    width: 15,
    height: 15,
  },
});
