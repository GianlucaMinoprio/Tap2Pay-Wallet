import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme, Layout } from "@ui-kitten/components";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";

import Text from "components/Text";

import { Food_Types_Enum } from "constants/Type";

const data = [Food_Types_Enum.Recent, Food_Types_Enum.Favorites];

interface Props {
  style?: ViewStyle;
  disabled?: boolean;
  selectedIndex: number;
  onChange(index: number): void;
}

const TabBar = ({ style, selectedIndex, disabled, onChange }: Props) => {
  const theme = useTheme();
  const transX = useSharedValue(0);

  const [widthItem, setWidthItem] = React.useState(0);

  React.useEffect(() => {
    transX.value = widthItem * selectedIndex;
  }, [selectedIndex, transX, widthItem]);

  const animatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      transX.value,
      [0, widthItem * 1],
      [theme["color-patrick-blue-100"], theme["color-radical-600"]]
    );

    return {
      transform: [
        {
          translateX: withSpring(transX.value, {
            stiffness: 200,
            damping: 19,
          }),
        },
      ],
      backgroundColor: backgroundColor,
    };
  });

  return (
    <Layout level="2" style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.boxAni,
          animatedStyles,
          { width: `${100 / data.length}%` },
        ]}
        onLayout={({ nativeEvent }) => setWidthItem(nativeEvent.layout.width)}
      />
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.btn}
            key={index}
            disabled={disabled}
            onPress={() => onChange(index)}
          >
            <Text
              capitalize
              category="headline"
              status={selectedIndex === index ? "white" : "grey700"}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Layout>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 24,
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
  },
  boxAni: {
    height: 48,
    position: "absolute",
    borderRadius: 24,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
