import React from "react";
import {
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Image,
  View,
} from "react-native";
import { useTheme } from "@ui-kitten/components";
import Animated from "react-native-reanimated";

import Text from "components/Text";
import useLayout from "hooks/useLayout";

interface Props {
  id: number;
  title: string;
  icon: ImageSourcePropType;
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
      x: activeIndex * 120 + 8 - (width - 250) / 2,
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
                    activeIndex === index
                      ? theme["background-basic-color-2"]
                      : "transparent",
                },
              ]}
              onPress={() => changeIndex(index)}
              activeOpacity={0.7}
            >
              <Image source={item.icon} style={styles.icon} />
              <Text
                capitalize
                category="headline"
                status="white"
                marginLeft={12}
              >
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
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  icon: {
    width: 30,
    height: 24,
  },
});
