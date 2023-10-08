import React, { memo } from "react";
import {
  Button,
  Icon,
  StyleService,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
import { Images } from "assets/images";
import Container from "components/Container";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
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
} from "react-native-reanimated";
import Dots from "../../components/Dots";
import NavigationAction from "components/NavigationAction";
import useLayout from "hooks/useLayout";
const Onboarding01 = memo(() => {
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
    if (activeIndex.value === PageOnBoarding1.length - 1) return;
    scrollRef.current?.scrollTo({ x: width * (activeIndex.value + 1) });
  }, [activeIndex]);
  const onIconPressPrv = React.useCallback(() => {
    if (activeIndex.value > PageOnBoarding1.length) return;
    scrollRef.current?.scrollTo({ x: width * (activeIndex.value - 1) });
  }, [activeIndex]);

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
        contentContainerStyle={{ width: width * 4, justifyContent: "center" }}
      >
        {PageOnBoarding1.map((i, index) => {
          let id = i.id;
          const input = [(id - 1) * width, id * width, (id + 1) * width];
          const style = useAnimatedStyle(() => {
            const translateX = interpolate(
              translationX.value,
              input,
              [width / 2, 0, -width / 2],
              Extrapolate.CLAMP
            );
            const scale = interpolate(
              translationX.value,
              input,
              [0.61, 1, 0.61],
              Extrapolate.CLAMP
            );
            const opacity = interpolate(translationX.value, input, [-1, 1, -1]);

            return {
              opacity: opacity,
              transform: [{ translateX }, { scale: scale }],
              width: width,
              alignItems: "center",
            };
          });
          return (
            <Animated.View key={index} style={style}>
              <View>
                <Image
                  source={Images.ellipse2}
                  /* @ts-ignore */
                  style={styles.imageEllipse}
                />
                <Image
                  source={i.image}
                  /* @ts-ignore */
                  style={styles.image}
                />
              </View>
              <Text center marginTop={48} category="title4">
                {i.title}
              </Text>
              <Text
                marginLeft={24}
                marginRight={24}
                center
                marginTop={16}
                category={"call-out"}
                status={"snow"}
              >
                {i.description}
              </Text>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
      <View
        style={[
          styles.bottomView,
          {
            width: width,
            paddingBottom: bottom + 32,
          },
        ]}
      >
        <Button
          style={styles.buttonLeft}
          onPress={onIconPressPrv}
          status="control"
          size="small"
          accessoryRight={() => {
            return (
              <Icon style={styles.iconPrv} pack="assets" name="leftArrow" />
            );
          }}
        />
        <Dots
          status="basic"
          widthInterpolate={120}
          translationValue={translationX}
          data={PageOnBoarding1}
        />
        <Button
          style={styles.buttonRight}
          status="primary"
          onPress={onIconPressNext}
          size="small"
          accessoryRight={() => {
            return <Icon style={styles.next} pack="assets" name="rightArrow" />;
          }}
        />
      </View>
    </Container>
  );
});
export default Onboarding01;
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
  titleView: {},
  animated: {
    marginBottom: 40,
    flexDirection: "row",
  },
  image: {
    alignSelf: "center",
    marginTop: 68,
  },
  imageEllipse: {
    position: "absolute",
    bottom: -57,
    right: -40,
    zIndex: -10,
  },
  buttonLeft: {
    width: 64,
    height: 64,
    borderTopRightRadius: 36,
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 36,
  },
  buttonRight: {
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    height: 64,
    borderTopLeftRadius: 36,
    borderBottomLeftRadius: 36,
  },
  tintColor: {
    tintColor: "color-patrick-blue-100",
  },

  text: {},
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const PageOnBoarding1 = [
  {
    id: 0,
    image: Images.wallet,
    title: "Create interactive financial",
    description:
      "This highlights how effective interactive financial content can be for finance companies in communicating their key messages to customers.",
  },
  {
    id: 1,
    image: Images.wallet,
    title: "Create interactive financial",
    description:
      "This highlights how effective interactive financial content can be for finance companies in communicating their key messages to customers.",
  },
  {
    id: 2,
    image: Images.wallet,
    title: "Create interactive financial",
    description:
      "This highlights how effective interactive financial content can be for finance companies in communicating their key messages to customers.",
  },
  {
    id: 3,
    image: Images.wallet,
    title: "Create interactive financial",
    description:
      "This highlights how effective interactive financial content can be for finance companies in communicating their key messages to customers.",
  },
];
