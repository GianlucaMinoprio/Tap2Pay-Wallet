import React, { memo } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Container from "components/Container";
import { Images } from "assets/images";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  Easing,
  withTiming,
} from "react-native-reanimated";
import Dots from "../../components/Dots";

const Onboarding10 = memo(() => {
  const { goBack } = useNavigation();
  const { height, width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });
  const imageAnim = useAnimatedStyle(() => {
    const transX = interpolate(
      translationX.value,
      [0, width, width * 2],
      [0, -width, -width * 2]
    );

    return {
      transform: [{ translateX: transX }],
    };
  });
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={{ zIndex: 10, paddingHorizontal: 24 }}
        accessoryRight={() => (
          <TouchableOpacity onPress={goBack}>
            <Image
              source={Images.logo4}
              /* @ts-ignore */
              style={styles.logo}
            />
          </TouchableOpacity>
        )}
      />
      <Animated.View style={[styles.image, imageAnim]}>
        {PageOnBoarding10.map((i, index) => {
          return (
            <View key={index} style={[{ width: width }]}>
              <Image source={i.image} />
            </View>
          );
        })}
      </Animated.View>
      <View>
        {PageOnBoarding10.map((i, index) => {
          const opacityAnim = useAnimatedStyle(() => {
            const opacity = interpolate(
              translationX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [-2, 1, -2],
              Extrapolate.CLAMP
            );

            return {
              opacity: withTiming(opacity, {
                duration: 750,
                easing: Easing.linear,
              }),
            };
          });
          return (
            <Animated.View style={[opacityAnim]} key={index}>
              <View style={styles.text}>
                <Text
                  marginLeft={40}
                  marginTop={56}
                  marginBottom={32}
                  category={"title1"}
                >
                  {i.title}
                </Text>
              </View>
            </Animated.View>
          );
        })}
      </View>
      <View style={[StyleSheet.absoluteFill]}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          horizontal
          snapToInterval={width}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          onScroll={scrollHandler}
          style={{ width: width }}
          contentContainerStyle={{ width: width * 4 }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 40,
          position: "absolute",
          width: "100%",
          bottom: bottom + 16,
        }}
      >
        <Dots
          translationValue={translationX}
          data={PageOnBoarding10}
          widthInterpolate={6}
          status="primary"
          heightDot={6}widthDot={6}
        />
        <Button
          style={{ marginTop: 48, marginBottom: 24 }}
          size="giant"
          children={"Get Starter"}
        />
        <Button size="giant" children={"Skip"} onPress={goBack} status="outline" />
      </View>
    </Container>
  );
});

export default Onboarding10;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 48,
    width: 48,
  },
  image: {
    flexDirection: "row",
    marginLeft: 40,
    marginTop: 62,
  },
  text: {
    width: "100%",
    position: "absolute",
  },
});
const PageOnBoarding10 = [
  {
    id: 0,
    title: "How to create awesome content for the finance sector.",
    image: Images.piggybank,
  },
  {
    id: 1,
    title: "How to create awesome content for the finance sector.",
    image: Images.piggybank,
  },
  {
    id: 2,
    title: "How to create awesome content for the finance sector.",
    image: Images.piggybank,
  },
  {
    id: 3,
    title: "How to create awesome content for the finance sector.",
    image: Images.piggybank,
  },
  {
    id: 4,
    title: "How to create awesome content for the finance sector.",
    image: Images.piggybank,
  },
  {
    id: 5,
    title: "How to create awesome content for the finance sector.",
    image: Images.piggybank,
  },
];
