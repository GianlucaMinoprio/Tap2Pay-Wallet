import React from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Dots from "components/Dots";
import CurrencyText from "components/CurrencyText";
import AnimatedAppearance from "components/AnimatedAppearance";

interface Props {
  image: ImageSourcePropType[];
  rate: number;
  price: number;
  title: string;
}
interface TabProps {
  data: Props;
}
const Tab = ({ data }: TabProps) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });

  return (
    <AnimatedAppearance>
      <View style={styles.container}>
        <Layout style={styles.rate} level="4">
          <Text
            children={`${data.rate}`}
            status="primary"
            category="title4"
            marginRight={8}
          />
          <Icon pack="assets" name="star" style={styles.star} />
        </Layout>
        <Animated.ScrollView
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          horizontal
          snapToInterval={width}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          onScroll={scrollHandler}
          style={{
            width: width,
            height: width / 1.5,
            backgroundColor: theme["background-basic-color-1"],
          }}
          contentContainerStyle={{ width: width * 4 }}
        >
          {data.image.map((item, index) => {
            const styleAni = useAnimatedStyle(() => {
              let input = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];
              const scale = interpolate(
                translationX.value,
                input,
                [0.61, 1, 0.61],
                Extrapolate.CLAMP
              );
              const opacity = interpolate(translationX.value, input, [
                -1,
                1,
                -1,
              ]);
              return {
                alignItems: "center",
                justifyContent: "center",
                transform: [{ scale: scale }],
                opacity: withTiming(opacity, {
                  duration: 350,
                  easing: Easing.linear,
                }),
              };
            });
            return (
              <Animated.View style={[{ width: width }, styleAni]} key={index}>
                <Image source={item} style={{ transform: [{ scale: 2 }] }} />
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
        <Dots
          data={data.image}
          translationValue={translationX}
          widthDot={8}
          style={styles.dots}
        />
        <View style={styles.bottom}>
          <View>
            <Text children={data.title} status="white" category="title2" />
            <CurrencyText
              children={` ${data.price}`}
              status="primary"
              category="title4"
            />
          </View>
          <Button
            size="64"
            status="secondary"
            accessoryRight={<Icon name="shopping" pack="assets" />}
            onPress={goBack}
          />
        </View>
      </View>
    </AnimatedAppearance>
  );
};

export default Tab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  star: {
    width: 16,
    height: 16,
    tintColor: "text-primary-color",
  },
  rate: {
    height: 32,
    width: 68,
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 24,
  },
  dots: {
    alignSelf: "center",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 24,
    marginRight: 16,
    marginTop: 24,
  },
});
