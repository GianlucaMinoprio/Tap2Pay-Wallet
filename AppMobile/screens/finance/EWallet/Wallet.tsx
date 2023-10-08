import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTheme } from "@ui-kitten/components";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Text from "components/Text";
import CurrencyText from "components/CurrencyText";

import { WalletFragment } from "constants/Type";

interface WalletProps {
  item: WalletFragment;
  onPress?(): void;
}

const Wallet = ({ item, onPress }: WalletProps) => {
  const theme = useTheme();
  const { name, icon, total_transactions, amount, color } = item;
  const process =
    total_transactions && amount
      ? total_transactions / amount < 0
        ? 0
        : total_transactions / amount > 1
        ? 1
        : total_transactions / amount
      : 0;

  const width = useSharedValue(0);

  const [widthItem, setWidthItem] = React.useState(0);

  const style = useAnimatedStyle(
    () => ({
      width: withTiming(width.value, {
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      backgroundColor: theme["color-basic-100"],
    }),
    [width, color]
  );

  React.useEffect(() => {
    width.value = widthItem * process;
  }, [width, widthItem, process]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, { backgroundColor: color }]}
    >
      {!!icon?.path && <Image source={icon?.path} style={styles.icon} />}
      <Text category="body" marginTop={8}>
        {name}
      </Text>
      <Text category="headline" opacity={0.5} marginTop={44}>
        {Math.round(process * 100)}%
      </Text>
      <View
        style={styles.line}
        onLayout={({ nativeEvent }) => setWidthItem(nativeEvent.layout.width)}
      >
        <Animated.View style={[styles.lineAnim, style]} />
      </View>
      <CurrencyText category="title4" marginTop={12}>
        {amount}
      </CurrencyText>
    </TouchableOpacity>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    width: 180,
    borderRadius: 16,
    marginRight: 16,
    padding: 24,
  },
  icon: {
    width: 32,
    height: 32,
  },
  line: {
    height: 4,
    width: "100%",
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginTop: 2,
  },
  lineAnim: {
    height: 4,
    flex: 1,
    borderRadius: 4,
  },
});
