import React from "react";
import { ScrollView, TouchableOpacity, ViewStyle } from "react-native";
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";
import Animated from "react-native-reanimated";

import Text from "components/Text";
import useLayout from "hooks/useLayout";

interface Props {
  tabs?: string[];
  level?: string;
  style?: ViewStyle;
  styleBtn?: ViewStyle;
  activeIndex: number;
  onChange(index: number): void;
}
const TABS = ["Fastfood", "Juice", "Ice-Cream", "Cake-Cream"];
const MenuTabBar = ({
  style,
  activeIndex,
  onChange,
  styleBtn,
  tabs = TABS,
}: Props) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

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
      x: activeIndex * 140 - (width - 80) / 2,
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
                backgroundColor:
                  activeIndex === i
                    ? theme["color-primary-100"]
                    : "transparent",
              },
              styleBtn,
            ]}
            onPress={() => changeIndex(i)}
            activeOpacity={0.7}
          >
            <Text
              capitalize
              category="headline"
              status={activeIndex === i ? "black" : "placeholder"}
            >
              {item}
            </Text>
          </AniButton>
        );
      })}
    </ScrollView>
  );
};

export default MenuTabBar;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
    paddingRight: 40,
    backgroundColor: "background-basic-color-1",
    paddingBottom: 8,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
