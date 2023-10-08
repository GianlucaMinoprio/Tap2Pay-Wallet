import React, { memo } from "react";
import {
  Button,
  Icon,
  Layout,
  StyleService,
  TopNavigation,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { Images } from "assets/images";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import {
  View,
  Image,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import Text from "components/Text";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedRef,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Dots from "../../components/Dots";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonText from "components/ButtonText";
const Onboarding06 = memo(() => {
  const { goBack } = useNavigation();
  const { height, width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
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
    if (activeIndex.value === PageOnBoarding06.length - 1) return;
    scrollRef.current?.scrollTo({ x: width * (activeIndex.value + 1) });
  }, [activeIndex]);
  const onIconPressPrv = React.useCallback(() => {
    if (activeIndex.value > PageOnBoarding06.length) return;
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
        style={{ zIndex: 10 }}
        title={() => (
          <TouchableOpacity onPress={goBack}>
            <Image
              source={Images.logo4}
              /* @ts-ignore */
              style={styles.logo}
            />
          </TouchableOpacity>
        )}
      />
      <View>
        <Animated.View style={[styles.animated, imageAnim]}>
          {PageOnBoarding06.map((i, index) => {
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
        <ImageBackground
          resizeMode="cover"
          source={Images.frame}
          /* @ts-ignore */
          style={{
            position: "absolute",
            width: 301,
            height: 394,
            zIndex: -1,
            alignSelf: "center",
            marginTop: 48,
          }}
        />
      </View>
      <View style={[styles.titleView]}>
        {PageOnBoarding06.map((i, index) => {
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
                <Text center category="title1" marginHorizontal={32}>
                  {i.title}
                </Text>
                <Text
                  marginLeft={32}
                  marginRight={32}
                  center
                  marginTop={16}
                  category={"call-out"}
                  status={"snow"}
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
          contentContainerStyle={{ width: width * 6 }}
        />
        <Layout
          level="4"
          style={[
            styles.bottomView,
            {
              width: width - 48,
              marginBottom: 24,
              marginHorizontal: 24,
              height: 56,
              alignItems: "center",
              borderRadius: 99,
              marginTop: 56,
            },
          ]}
        >
          <TouchableOpacity style={styles.buttonRight} onPress={onIconPressPrv}>
            <Icon pack="assets" name="leftArrow" style={styles.tintColor} />
          </TouchableOpacity>
          <Dots
            widthInterpolate={6}
            translationValue={translationX}
            data={PageOnBoarding06}
            status="primary"
            widthDot={6}
            heightDot={6}
          />

          <TouchableOpacity style={styles.buttonLeft} onPress={onIconPressNext}>
            <Icon pack="assets" name="rightArrow" style={{tintColor:theme['text-salmon-color']}} />
          </TouchableOpacity>
        </Layout>
        <TouchableOpacity onPress={goBack}>
          <Text
            marginBottom={bottom + 16}
            status="primary"
            center
            category="title4"
          >
            Get Start
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
});
export default Onboarding06;
const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 48,
    width: 48,
  },
  titleView: {
    marginTop: 62,
  },
  animated: {
    marginBottom: 40,
    flexDirection: "row",
  },
  image: {
    alignSelf: "center",
    marginTop: 44,
  },
  imageEllipse: {
    position: "absolute",
    bottom: 0,
    right: 57,
    zIndex: -10,
  },
  buttonLeft: {
    width: 64,
    height: 64,
    borderTopRightRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 24,
  },
  buttonRight: {
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    height: 64,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  tintColor: {
    tintColor: "color-primary-100",
  },
  text: {
    position: "absolute",
    width: "100%",
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const PageOnBoarding06 = [
  {
    id: 0,
    image: Images.target,
    title: "That Every Business Must Employ",
    description:
      "Open an app geared toward stock trading, and you’ll probably discover a dictionary of investing terms that rivals Investopedia. ",
  },
  {
    id: 1,
    image: Images.target,
    title: "That Every Business Must Employ",
    description:
      "Open an app geared toward stock trading, and you’ll probably discover a dictionary of investing terms that rivals Investopedia. ",
  },
  {
    id: 2,
    image: Images.target,
    title: "That Every Business Must Employ",
    description:
      "Open an app geared toward stock trading, and you’ll probably discover a dictionary of investing terms that rivals Investopedia. ",
  },
  {
    id: 3,
    image: Images.target,
    title: "That Every Business Must Employ",
    description:
      "Open an app geared toward stock trading, and you’ll probably discover a dictionary of investing terms that rivals Investopedia. ",
  },
  {
    id: 4,
    image: Images.target,
    title: "That Every Business Must Employ",
    description:
      "Open an app geared toward stock trading, and you’ll probably discover a dictionary of investing terms that rivals Investopedia. ",
  },
  {
    id: 5,
    image: Images.target,
    title: "That Every Business Must Employ",
    description:
      "Open an app geared toward stock trading, and you’ll probably discover a dictionary of investing terms that rivals Investopedia. ",
  },
];
