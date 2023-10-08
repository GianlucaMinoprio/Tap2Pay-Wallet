import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  View,
} from "react-native";
import { Icon, useTheme } from "@ui-kitten/components";
import Animated from "react-native-reanimated";

import Text from "components/Text";
import useLayout from "hooks/useLayout";

interface Props {
  id: number;
  title: string;
  icon: string;
}

interface ItemProps {
  tabs: Props[];
  level?: string;
  style?: ViewStyle;
  activeIndex: number;
  onChange(index: number): void;
}

const TabBar = ({ style, activeIndex, onChange, tabs }: ItemProps) => {
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
      x: activeIndex * 120 + 8 - (width - 200) / 2,
      animated: true,
    });
  }, [activeIndex]);
  return (
    <View>
      <ScrollView
        contentContainerStyle={[styles.container, style]}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={refScrollView}
      >
        {tabs.map((item, index) => {
          return (
            <AniButton
              key={index}
              style={[
                styles.btn,
                {
                  borderColor: theme["background-basic-color-2"],
                  backgroundColor:
                    activeIndex !== index
                      ? theme["background-basic-color-2"]
                      : theme["background-basic-color-2"],
                },
              ]}
              onPress={() => changeIndex(index)}
              activeOpacity={0.7}
            >
              <Icon
                name={item.icon}
                pack="assets"
                style={[styles.icon, { tintColor: theme["text-snow-color"] }]}
              />
              <Text capitalize category="subhead" status="snow" marginLeft={8}>
                {item.title}
              </Text>
            </AniButton>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  btn: {
    marginRight: 16,
    flexDirection: "row",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
});
