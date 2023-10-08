import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@ui-kitten/components";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Text from "components/Text";
import CurrencyText from "components/CurrencyText";

import { Spend } from "./type";

interface SpendItemProps {
  item: Spend;
  totalSpend: number;
  onPress?(): void;
}

const SpendItem = ({ item, totalSpend, onPress }: SpendItemProps) => {
  const theme = useTheme();
  const { category_name, amount, color, emoji } = item;
  const process = amount / totalSpend;
  const width = useSharedValue(0);

  const [widthItem, setWidthItem] = React.useState(0);

  React.useEffect(() => {
    width.value = widthItem * process;
  }, [width, widthItem, process]);

  const style = useAnimatedStyle(
    () => ({
      width: withTiming(width.value, {
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      backgroundColor: color,
    }),
    [width, color]
  );

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text marginTop={16} marginRight={8}>
        {emoji}
      </Text>
      <View style={styles.content}>
        <View style={styles.left}>
          <Text category="headline" status="white">
            {category_name}
          </Text>
          <CurrencyText
            category="caption1"
            status="white"
            opacity={0.5}
            marginTop={3}
          >
            {amount}
          </CurrencyText>
        </View>
        <View style={styles.right}>
          <Text category="call-out" marginBottom={6} style={{ color: color }}>
            {Math.round(process * 100)}%
          </Text>
          <View
            style={[
              styles.line,
              { backgroundColor: theme["color-basic-1700"] },
            ]}
            onLayout={({ nativeEvent }) =>
              setWidthItem(nativeEvent.layout.width)
            }
          >
            <Animated.View style={[styles.lineAnim, style]} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SpendItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 24,
  },
  content: {
    flex: 1,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(216, 216, 216, 0.1)",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingRight: 24,
  },
  line: {
    height: 4,
    width: "100%",
    borderRadius: 4,
    overflow: "hidden",
  },
  lineAnim: {
    height: 4,
    flex: 1,
    borderRadius: 4,
  },
  left: {
    flex: 7,
  },
  right: {
    flex: 3,
    alignItems: "flex-end",
    marginBottom: 6,
  },
});
