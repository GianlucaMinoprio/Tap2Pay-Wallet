import React, { memo } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { View, Image, StyleSheet } from "react-native";
import {Button,Icon,StyleService,TopNavigation,useStyleSheet} from "@ui-kitten/components";
import { Images } from "assets/images";
import Container from "components/Container";
import Text from "components/Text";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import NavigationAction from "components/NavigationAction";
import Dots from "../../components/Dots";
import useLayout from "hooks/useLayout";

const Onboarding02 = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });

  const scrollRef = useAnimatedRef<ScrollView>();
  const activeIndex = useDerivedValue(() => {
    return Math.round(translationX.value / width);
  });
  const onIconPressNext = React.useCallback(() => {
    if (activeIndex.value === PageOnBoarding2.length - 1) return;
    scrollRef.current?.scrollTo({ x: width * (activeIndex.value + 1) });
  }, [activeIndex]);
  const onIconPressPrv = React.useCallback(() => {
    if (activeIndex.value > PageOnBoarding2.length) return;
    scrollRef.current?.scrollTo({ x: width * (activeIndex.value - 1) });
  }, [activeIndex]);

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
        accessoryLeft={() => (
          <TouchableOpacity onPress={goBack}>
            <Image
              source={Images.logo4}
              /* @ts-ignore */
              style={styles.logo}
            />
          </TouchableOpacity>
        )}
        accessoryRight={() => (
          <NavigationAction
            title={"SKIP"}
            titleStatus={"primary"}
            onPress={goBack}
          />
        )}
      />
      <View>
        <Animated.View style={[styles.animated, imageAnim]}>
          {PageOnBoarding2.map((i, index) => {
            return (
              <View key={index} style={{ width: width }}>
                <Image
                  source={i.image}
                  /* @ts-ignore */
                  style={styles.image}
                />
              </View>
            );
          })}
        </Animated.View>
        <Image
          source={Images.ellipse2}
          /* @ts-ignore */
          style={styles.imageEllipse}
        />
      </View>
      <View>
        {PageOnBoarding2.map((i, index) => {
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
            <Animated.View style={[opacityAnim, { width: width }]} key={index}>
              <View style={styles.text}>
                <Text marginLeft={40} marginTop={96} category={"header"}>
                  {i.title}
                </Text>
                <Text
                  marginRight={116}
                  marginLeft={40}
                  category="call-out"
                  status="snow"
                >
                  {i.description}
                </Text>
              </View>
            </Animated.View>
          );
        })}
      </View>
      <View style={[StyleSheet.absoluteFill]}>
        <Animated.ScrollView
          ref={scrollRef as any}
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
        <View
          style={[
            styles.bottomView,
            {
              width: width,
              paddingBottom: bottom + 32,
            },
          ]}
        >
          <Dots
            widthInterpolate={120}
            translationValue={translationX}
            data={PageOnBoarding2}
            style={{ marginBottom: 16 }}
          />
          <View>
            <Button
              status="control"
              size="small"
              onPress={onIconPressPrv}
              accessoryRight={(props) => {
                return (
                  <Icon style={styles.iconPrv} pack="assets" name="upArrow" />
                );
              }}
              style={styles.buttonUp}
            />
            <Button
              status="primary"
              onPress={onIconPressNext}
              size="small"
              accessoryRight={(props) => {
                return (
                  <Icon style={styles.next} pack="assets" name="downArrow" />
                );
              }}
              style={styles.buttonDown}
            />
          </View>
        </View>
      </View>
    </Container>
  );
});
export default Onboarding02;
const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  iconPrv: {
    tintColor: "text-primary-color",
  },
  next: {
    tintColor: "text-blue-color",
  },
  logo: {
    height: 48,
    width: 48,
  },
  animated: {
    // marginBottom: 40,
    flexDirection: "row",
  },
  image: {
    alignSelf: "center",
    marginTop: 44,
  },
  imageEllipse: {
    position: "absolute",
    top: 108,
    left: 28,
    zIndex: -10,
  },
  text: {
    position: "absolute",
    width: "100%",
  },
  buttonUp: {
    width: 64,
    height: 64,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDown: {
    width: 64,
    alignItems: "center",
    borderRadius: 0,
    justifyContent: "center",
    height: 64,
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 32,
  },
  tintColor: {
    tintColor: "color-patrick-blue-100",
  },
  tintColorUp: {
    tintColor: "color-primary-100",
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingLeft: 24,
    paddingRight: 20,
  },
});
const PageOnBoarding2 = [
  {
    id: 0,
    image: Images.graph3,
    title: "Content Is\nOur Business",
    description:
      "Open an app geared toward stock trading, and you’ll probably discover a dictionary of investing terms that rivals Investopedia.",
  },
  {
    id: 1,
    image: Images.graph3,
    title: "Content Is\nOur Business",
    description:
      "Open an app geared toward stock trading, and you’ll probably discover a dictionary of investing terms that rivals Investopedia.",
  },
  {
    id: 2,
    image: Images.graph3,
    title: "Content Is\nOur Business",
    description:
      "Open an app geared toward stock trading, and you’ll probably discover a dictionary of investing terms that rivals Investopedia.",
  },
  {
    id: 3,
    image: Images.graph3,
    title: "Content Is\nOur Business",
    description:
      "Open an app geared toward stock trading, and you’ll probably discover a dictionary of investing terms that rivals Investopedia.",
  },
];
