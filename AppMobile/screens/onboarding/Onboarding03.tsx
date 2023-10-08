import React, { memo } from "react";
import { Button, Icon, Layout, useTheme } from "@ui-kitten/components";
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import Container from "components/Container";
import { Images } from "assets/images";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Dots from "../../components/Dots";

import { useNavigation } from "@react-navigation/native";
const Onboarding03 = memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();

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
      <Animated.View>
        <Layout style={[styles.layout]} level={"4"}>
          <TouchableOpacity onPress={goBack}>
            <Image
              source={Images.logo4}
              style={[styles.imageHeader, { marginTop: top }]}
            />
          </TouchableOpacity>
          <Animated.View
            style={[styles.contentImage, imageAnim, { width: width * 4 }]}
          >
            {PageOnBoarding3.map((i, index) => {
              return (
                <View style={{ width: width}} key={index}>
                  <Image
                    source={i.image}
                    style={[styles.image, { width: 245, height: 216 }]}
                  />
                </View>
              );
            })}
          </Animated.View>
        </Layout>
      </Animated.View>
      <View style={[styles.titleView, { height: height * 0.4 }]}>
        {PageOnBoarding3.map((i, index) => {
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
            <Animated.View style={[opacityAnim, { width: "100%" }]} key={index}>
              <View style={styles.text}>
                <Text status="basic" category="header" marginTop={40}>
                  {i.step}.
                </Text>
                <Text marginTop={8} category="title2">
                  {i.title}
                </Text>
                <Text marginTop={8} category="call-out" status="snow">
                  {i.description}
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
        <View style={{ paddingBottom: bottom + 32, paddingLeft: 40 }}>
          <Dots
            widthInterpolate={40}
            translationValue={translationX}
            data={PageOnBoarding3}
          />
          <Button
            onPress={() => goBack()}
            size="small"
            style={{
              width: 64,
              height: 64,
              borderRadius: 50,
              position: "absolute",
              right: 24,
              bottom: bottom + 16,
            }}
            accessoryRight={() => (
              <Icon
                style={{ tintColor: theme["text-blue-color"] }}
                pack="assets"
                name="rightArrow"
              />
            )}
          />
        </View>
      </View>
    </Container>
  );
});
export default Onboarding03;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  layout: {
    marginHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  text: {
    position: "absolute",
  },
  titleView: {
    marginHorizontal: 40,
  },
  contentImage: {
    paddingBottom: 66,
    paddingTop: 58,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    width: "100%",
    flexDirection: "row",
  },
  image: {
    justifyContent: "center",
    alignSelf: "center",
  },
  imageHeader: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignSelf: "center",
  },
});
const PageOnBoarding3 = [
  {
    id: 0,
    image: Images.pizza,
    step: "01",
    title: "Create a gift guide for food lovers",
    description:
      "Establish your own food awards and share your favourites with your audience",
  },
  {
    id: 1,
    image: Images.pizza,
    step: "02",
    title: "Create a gift guide for food lovers",
    description:
      "Establish your own food awards and share your favourites with your audience",
  },
  {
    id: 2,
    image: Images.pizza,
    step: "03",
    title: "Create a gift guide for food lovers",
    description:
      "Establish your own food awards and share your favourites with your audience",
  },
  {
    id: 3,
    image: Images.pizza,
    step: "04",
    title: "Create a gift guide for food lovers",
    description:
      "Establish your own food awards and share your favourites with your audience",
  },
];
