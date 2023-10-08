import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme, Layout } from "@ui-kitten/components";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import Text from "components/Text";

interface Props {
  tabs: string[];
  level?: string;
  style?: ViewStyle;
  activeIndex: number;
  onChange(index: number): void;
}

const TabBarProfile = ({
  style,
  activeIndex,
  onChange,
  tabs,
  level = "2",
}: Props) => {
  const theme = useTheme();
  const transX = useSharedValue(0);

  const [widthItem, setWidthItem] = React.useState(0);

  React.useEffect(() => {
    transX.value = widthItem * activeIndex;
  }, [activeIndex, transX, widthItem]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(transX.value, {
            stiffness: 200,
            damping: 15,
          }),
        },
      ],
      backgroundColor: theme["color-primary-100"],
    };
  });

  return (
    <Layout style={[styles.container, style]} level={level}>
      {tabs.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.btn}
            key={index}
            activeOpacity={0.7}
            onPress={() => onChange(index)}
          >
            <Text
              capitalize
              category="headline"
              marginTop={4}
              style={{
                color:
                  activeIndex === index
                    ? theme["color-basic-100"]
                    : theme["color-basic-1200"],
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
      <Animated.View
        style={[
          styles.boxAni,
          animatedStyles,
          { width: `${100 / tabs.length}%` },
        ]}
        onLayout={({ nativeEvent }) => setWidthItem(nativeEvent.layout.width)}
      />
    </Layout>
  );
};

export default TabBarProfile;

const styles = StyleSheet.create({
  container: {
    height: 46,
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#3E4C59",
  },
  boxAni: {
    height: 2,
    position: "absolute",
    borderRadius: 20,
    bottom: 0,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
