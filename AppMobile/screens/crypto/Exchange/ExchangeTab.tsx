import React from "react";
import { ScrollView, TouchableOpacity, ViewStyle } from "react-native";
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";
import Animated, { useSharedValue } from "react-native-reanimated";

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
const TABS = ["BTC", "ETH", "LTC", "XRP", "EOS"];
const ExchangeTab = ({
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
  const transX = useSharedValue(0);

  const [widthItem, setWidthItem] = React.useState(70 + 16);

  React.useEffect(() => {
    transX.value = widthItem * activeIndex;
  }, [activeIndex, transX, widthItem]);

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
            style={[styles.btn, styleBtn]}
            onPress={() => changeIndex(i)}
            activeOpacity={0.7}
          >
            <Text
              capitalize
              category="headline"
              uppercase
              status={activeIndex === i ? "primary" : "placeholder"}
            >
              {item}/USD
            </Text>
            <Animated.View
              style={[
                styles.line,
                {
                  backgroundColor:
                    activeIndex === i
                      ? theme["text-primary-color"]
                      : "transparent",
                },
              ]}
            />
          </AniButton>
        );
      })}
    </ScrollView>
  );
};

export default ExchangeTab;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
    paddingRight: 32,
    backgroundColor: "background-basic-color-1",
    paddingBottom: 8,
  },

  line: {
    borderRadius: 20,
    height: 1,
    width: "100%",
    marginTop: 8,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
});
