import React, { memo } from "react";
import { View, ImageRequireSource, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Animated, {
  interpolate,
  interpolateColor,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface Props {
  id: number;
  avatar: ImageRequireSource;
  name: string;
  amount: number;
}
interface DataProps {
  title: string;
  value: string | number;
}
interface ItemProps {
  item: Props;
  data: DataProps[];
}

const ActivityCard = memo(({ item, data }: ItemProps) => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const aref = useAnimatedRef<View>();
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withSpring(1) : withTiming(0)
  );
  const heightAnimated = useSharedValue(0);

  const styleAnimated = useAnimatedStyle(() => ({
    height: heightAnimated.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
    overflow: "scroll",
    flexWrap: "wrap",
    margin: 10,
  }));

  const rotateX = useDerivedValue(() => {
    return withSpring(progress.value ? 180 : 0, {
      damping: 12,
      stiffness: 120,
    });
  });
  const styleIconDrop = useAnimatedStyle(() => {
    return {
      alignSelf: "center",
      transform: [{ rotate: `${rotateX.value}deg` }],
      marginRight:12
    };
  });
  const containerAnimated = useAnimatedStyle(() => {
    const background = interpolateColor(
      progress.value,
      [0, 1],
      [theme["background-basic-color-1"], theme["background-basic-color-2"]]
    );
    const marginBottom = interpolate(progress.value, [0, 1], [0, 16]);
    return {
      backgroundColor: withTiming(background, { duration: 50 }),
      borderRadius: withTiming(16),
      marginBottom: withSpring(marginBottom, { damping: 12, stiffness: 120 }),
    };
  });
  const handleDrop = React.useCallback(() => {
    if (heightAnimated.value === 0) {
      runOnUI(() => {
        "worklet";
        heightAnimated.value = measure(aref).height;
      })();
    }
    open.value = !open.value;
  }, []);
  return (
    <Animated.View style={containerAnimated}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={handleDrop}
      >
        <View style={styles.title}>
          <Avatar source={item.avatar} size={"48"} />
          <View>
            <Text marginLeft={16} category="headline" marginBottom={4}>
              {item.name}
            </Text>
            <Text
              category="footnote"
              marginLeft={16}
              status={item.amount >= 0 ? "high-light" : "red"}
            >
              {item.amount >= 0 ? "+$" : "-$"}
              {item.amount < 0 ? item.amount * -1 : item.amount}
            </Text>
          </View>
        </View>
        <Animated.View style={[styleIconDrop]}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleDrop}
          >
            <Icon pack="assets" name="downChevron" />
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
      <Animated.ScrollView
        style={styleAnimated}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      >
        <View
          style={styles.footer}
          ref={aref}
          onLayout={({
            nativeEvent: {
              layout: { height: h },
            },
          }) => {}}
        >
          <>
            {data.map((item, i) => {
              return (
                <View
                  key={item.title + i}
                  style={{ width: 152 * (width / 375), marginBottom: 16 }}
                >
                  <Text category="caption1" status={"placeholder"}>
                    {item.title}
                  </Text>
                  <Text category="headline">{item.value}</Text>
                </View>
              );
            })}
          </>
        </View>
      </Animated.ScrollView>
    </Animated.View>
  );
});

export default ActivityCard;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "background-basic-color-2",
    padding: 10,
  },
  title: {
    flexDirection: "row",
  },
  button: {
    alignSelf: "center",
  },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
