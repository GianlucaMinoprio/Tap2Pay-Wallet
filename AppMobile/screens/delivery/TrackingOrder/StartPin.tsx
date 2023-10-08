import React from "react";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { LatLng, Marker } from "react-native-maps";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { View } from "react-native";

interface StartPinProps {
  coordinate: LatLng;
}
const StartPin = ({ coordinate }: StartPinProps) => {
  const styles = useStyleSheet(themedStyles);

  const style = useAnimatedStyle(() => {
    const opacity = withSequence(
      withSpring(1),
      withRepeat(withTiming(0.9, { duration: 100 }), 6, true),
      withSpring(0.4),
      withTiming(1, { duration: 150 })
    );
    return {
      alignItems: "center",
      justifyContent: "center",
      transform: [{ scale: opacity }],
    };
  });

  return (
    <Marker
      coordinate={{
        latitude: coordinate.latitude - 0.0044,
        longitude: coordinate.longitude,
      }}
      style={styles.container}
    >
      <Animated.View style={style}>
        <LinearGradient
          style={[styles.large]}
          colors={["#5191F0", "#133374"]}
        />
        <LinearGradient style={styles.huge} colors={["#5191F0", "#133374"]} />
        <LinearGradient style={styles.md} colors={["#5191F0", "#133374"]} />
        <LinearGradient style={styles.sm} colors={["#133374", "#5191F0"]} />
      </Animated.View>
      <View style={styles.center} />
    </Marker>
  );
};

export default StartPin;

const themedStyles = StyleService.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  large: {
    width: 80,
    height: 80,
    opacity: 0.2,
    borderRadius: 40,
  },
  huge: {
    width: 64,
    height: 64,
    opacity: 0.3,
    borderRadius: 32,
    position: "absolute",
  },
  md: {
    width: 46,
    height: 46,
    opacity: 0.3,
    borderRadius: 24,
    position: "absolute",
  },
  sm: {
    width: 28,
    height: 28,
    borderRadius: 14,
    position: "absolute",
  },
  center: {
    width: 14,
    height: 14,
    position: "absolute",
    borderRadius: 99,
    backgroundColor: "text-basic-color",
  },
});
