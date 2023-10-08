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
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import Dots from "../../components/Dots";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Onboarding05 = memo(() => {
  const { goBack } = useNavigation();
  const { height, width } = useWindowDimensions();
  const styles = useStyleSheet(themedStyles);
  const { top, bottom } = useSafeAreaInsets();
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
        style={{ zIndex: 10, paddingLeft: 12 }}
        accessoryLeft={() => <NavigationAction status="primary" />}
      />
      <Animated.View style={[{ flexDirection: "row" }, imageAnim]}>
        {PageOnBoarding5.map((i, index) => {
          return (
            <View key={index} style={[styles.image, { width: width }]}>
              <Image source={i.image} />
            </View>
          );
        })}
      </Animated.View>
      <Layout style={styles.bottomView} level="4">
        <Dots
          style={styles.dot}
          status='primary'
          widthInterpolate={40}
          translationValue={translationX}
          data={PageOnBoarding5}
        />
        <View>
          {PageOnBoarding5.map((i, index) => {
            const opacityAnim = useAnimatedStyle(() => {
              const opacity = interpolate(
                translationX.value,
                [(index - 1) * width, index * width, (index + 1) * width],
                [-2, 1, -2],
                Extrapolate.CLAMP
              );

              return {
                opacity: withTiming(opacity, {
                  duration: 550,
                  easing: Easing.linear,
                }),
              };
            });
            return (
              <Animated.View
                style={[opacityAnim, { width: width }]}
                key={index}
              >
                <View style={styles.textView}>
                  <Text center category="title2">
                    {i.title}
                  </Text>
                  <Text marginTop={8} category="call-out" center status="snow">
                    {i.description}
                  </Text>
                </View>
              </Animated.View>
            );
          })}
        </View>
      </Layout>
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
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingBottom: bottom + 16,
          }}
        >
          <Icon pack="assets" name="rightArrow" style={styles.icon} />
          <Text category="title4" marginLeft={8} status="primary">
            GET START
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
});

export default Onboarding05;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  textView: {
    position: "absolute",
    marginLeft: 24,
    marginRight: 28,
  },
  dot: {
    marginVertical: 40,
    alignSelf: "center",
  },
  image: {
    alignItems: "center",
    marginVertical: 40,
  },
  icon: {
    tintColor: "color-primary-100",
  },
  bottomView: {
    marginTop: 40,
    marginLeft: 28,
    flex: 1,
    borderTopLeftRadius: 48,
  },
});
const PageOnBoarding5 = [
  {
    id: 0,
    image: Images.hotdog,
    title: "Create a gift guide for food lovers",
    description:
      "Establish your own food awards and share your favourites with  audience",
  },
  {
    id: 1,
    image: Images.hotdog,
    title: "Create a gift guide for food lovers",
    description:
      "Establish your own food awards and share your favourites with  audience",
  },
  {
    id: 3,
    image: Images.hotdog,
    title: "Create a gift guide for food lovers",
    description:
      "Establish your own food awards and share your favourites with  audience",
  },
  {
    id: 4,
    image: Images.hotdog,
    title: "Create a gift guide for food lovers",
    description:
      "Establish your own food awards and share your favourites with  audience",
  },
];
