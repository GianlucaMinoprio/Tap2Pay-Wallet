import dayjs from "dayjs";
import React from "react";
import { View, Image, ImageSourcePropType, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Text from "./Text";
interface Props {
  id: number;
  image: ImageSourcePropType;
  name: string;
  date: number;
}
interface OverflowItemProps {
  data: Props[];
  scrollXAnimated: Animated.SharedValue<number>;
}

const OverflowItems = ({ data, scrollXAnimated }: OverflowItemProps) => {
  const imageAnimation = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollXAnimated.value,
      [-1, 0, 1],
      [1, 0, -1]
    );
    return { transform: [{ translateY }] };
  });

  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={imageAnimation}>
        {data.map((i, _) => {
          return (
            <View key={_}>
              <Text>{i.name}</Text>
              <Text>{dayjs(i.date).format("DD/MM/YYYY")}</Text>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};
export default OverflowItems;
const styles = StyleSheet.create({
  overflowContainer: {
    flex: 1,
  },
});
