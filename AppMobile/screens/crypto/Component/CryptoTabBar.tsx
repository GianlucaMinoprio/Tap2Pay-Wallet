import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "@ui-kitten/components";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";

import Text from "components/Text";

interface Props {
  tabs: string[];
  style?: ViewStyle;
  disabled?: boolean;
  selectedIndex: number;
  onChange(index: number): void;
}

const CryptoTabBar = ({
  style,
  selectedIndex,
  disabled,
  onChange,
  tabs,
}: Props) => {
  const theme = useTheme();
  const transX = useSharedValue(0);
  const [widthItem, setWidthItem] = React.useState(0);

  React.useEffect(() => {
    transX.value = widthItem * selectedIndex;
  }, [selectedIndex, transX, widthItem]);
  const changeIndex = React.useCallback(
    (i: number) => {
      return onChange(i);
    },
    [selectedIndex, onChange]
  );
  const animatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      transX.value,
      [-widthItem * selectedIndex, 0, widthItem * selectedIndex],
      [theme["color-primary-100"], "transparent", theme["color-primary-100"]]
    );

    return {
      transform: [
        {
          translateX: withSpring(transX.value, {
            stiffness: 150,
            damping: 22,
          }),
        },
      ],
      backgroundColor: backgroundColor,
    };
  });

  return (
    <View
      style={[
        styles.container,
        style,
        { backgroundColor: theme["background-basic-color-2"] },
      ]}
    >
      <Animated.View
        style={[
          styles.boxAni,
          animatedStyles,
          { width: `${100 / tabs.length}%` },
        ]}
        onLayout={({ nativeEvent }) => setWidthItem(nativeEvent.layout.width)}
      />
      {tabs.map((item, _) => {
        return (
          <TouchableOpacity
            style={styles.btn}
            key={_}
            disabled={disabled}
            onPress={() => changeIndex(_)}
          >
            <Text
              capitalize
              center
              category="headline"
              status={selectedIndex === _ ? "black" : "placeholder"}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CryptoTabBar;

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 30,
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  boxAni: {
    height: 48,
    position: "absolute",
    borderRadius: 25,
    left: 4,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});