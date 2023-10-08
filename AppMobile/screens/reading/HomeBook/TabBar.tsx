import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "@ui-kitten/components";
import Animated from "react-native-reanimated";

import Text from "components/Text";
import useLayout from "hooks/useLayout";

interface Props {
  tabs: string[];
  level?: string;
  style?: ViewStyle;
  styleBtn?: ViewStyle;
  activeIndex: number;
  onChange(index: number): void;
}

const TabBar = ({ style, activeIndex, onChange, tabs, styleBtn }: Props) => {
  const theme = useTheme();
  const AniButton = Animated.createAnimatedComponent(TouchableOpacity);
  const { width } = useLayout();
  const changeIndex = React.useCallback(
    (i: number) => {
      return onChange(i);
    },
    [activeIndex]
  );
  const refScrollView = React.useRef<ScrollView>(null);
  React.useEffect(() => {
    refScrollView.current?.scrollTo({
      x: activeIndex * 120 + 8 - (width - 100) / 2,
      animated: true,
    });
  }, [activeIndex]);
  return (
    <ScrollView
      contentContainerStyle={[styles.container, style]}
      horizontal
      showsHorizontalScrollIndicator={false}
      ref={refScrollView}
    >
      {tabs.map((item, i) => {
        return (
          <AniButton
            onLayout={(event) => event.nativeEvent.layout.width}
            key={i}
            style={[
              styles.btn,
              {
                borderColor: theme["background-basic-color-2"],
                backgroundColor:
                  activeIndex === i
                    ? theme["background-basic-color-2"]
                    : "transparent",
              },
              styleBtn,
            ]}
            onPress={() => changeIndex(i)}
            activeOpacity={0.7}
          >
            <Text
              capitalize
              marginVertical={13}
              marginHorizontal={24}
              category="headline"
              status="white"
            >
              {item}
            </Text>
          </AniButton>
        );
      })}
    </ScrollView>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
  },
  boxAni: {
    height: 2,
    position: "absolute",
    borderRadius: 20,
    bottom: 0,
  },
  btn: {
    marginRight: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
