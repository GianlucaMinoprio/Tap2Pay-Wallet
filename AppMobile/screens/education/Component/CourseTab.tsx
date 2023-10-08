import React from "react";
import { ScrollView, TouchableOpacity, ViewStyle } from "react-native";
import {
  Icon,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import Animated from "react-native-reanimated";

import Text from "components/Text";
import useLayout from "hooks/useLayout";

interface TabProps {
  name: string;
  icon: string;
}
interface Props {
  level?: string;
  style?: ViewStyle;
  styleBtn?: ViewStyle;
  activeIndex: number;
  onChange(index: number): void;
}
const TABS = [
  { name: "Design", icon: "fire" },
  { name: "3D Modeling", icon: "eye" },
  { name: "Motion Design", icon: "crown" },
];
const CourseTab = ({ style, activeIndex, onChange, styleBtn }: Props) => {
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
      {TABS.map((item, i) => {
        return (
          <AniButton
            onLayout={(event) => event.nativeEvent.layout.width}
            key={i}
            style={[
              styles.btn,
              {
                borderColor:
                  activeIndex === i
                    ? "transparent"
                    : theme["background-basic-color-2"],
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
            <Icon
              pack="assets"
              name={item.icon}
              style={[
                styles.icon,
                {
                  tintColor:
                    activeIndex === i
                      ? theme["text-black-color"]
                      : theme["text-placeholder-color"],
                },
              ]}
            />
            <Text
              capitalize
              category="headline"
              status={activeIndex === i ? "black" : "placeholder"}
              marginLeft={8}
            >
              {item.name}
            </Text>
          </AniButton>
        );
      })}
    </ScrollView>
  );
};

export default CourseTab;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
    paddingRight: 40,
    backgroundColor: "background-basic-color-1",
    paddingBottom: 8,
  },
  icon: {
    width: 16,
    height: 16,
  },
  boxAni: {
    height: 2,
    position: "absolute",
    borderRadius: 20,
    bottom: 0,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 24,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
