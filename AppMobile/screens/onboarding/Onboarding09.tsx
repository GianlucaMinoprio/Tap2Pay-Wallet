import React, { memo } from "react";
import { useWindowDimensions, Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Container from "components/Container";
import { Images } from "assets/images";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Onboarding09 = memo(() => {
  const { goBack } = useNavigation();
  const { height, width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const styles = useStyleSheet(themedStyles);
  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });

  const RenderItem = React.useCallback(({ item, index }) => {
    const styleAni = useAnimatedStyle(() => {
      let input = [
        (item.id - 1) * width,
        item.id * width,
        (item.id + 1) * width,
      ];
      const scale = interpolate(
        translationX.value,
        input,
        [0.61, 1, 0.61],
        Extrapolate.CLAMP
      );
      const opacity = interpolate(translationX.value, input, [-1, 1, -1]);
      return {
        transform: [{ scale: scale }],
        opacity: withTiming(opacity, {
          duration: 750,
          easing: Easing.linear,
        }),
      };
    });
    return (
      <Animated.View style={[{ width: width }, styleAni]}>
        <Text
          center
          marginLeft={36}
          marginRight={36}
          marginTop={40}
          category="title1"
        >
          {item.title}
        </Text>
        <Text
          category="call-out"
          marginTop={16}
          center
          status="placeholder"
          marginLeft={24}
          marginRight={24}
        >
          {item.des}
        </Text>
        <Image source={item.image} style={{ alignSelf: "center" }} />
      </Animated.View>
    );
  }, []);
  const [data, setData] = React.useState(dataO9);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={{ zIndex: 10 }}
        title={() => (
          <Image
            source={Images.logo4}
            /* @ts-ignore */
            style={styles.logo}
          />
        )}
      />
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={width}
      >
        {data.map((item, index) => {
          return <RenderItem item={item} key={index} />;
        })}
      </Animated.ScrollView>
      <Layout
        style={[
          styles.btmView,
          {
            paddingBottom: bottom + 8,
          },
        ]}
        level="4"
      >
        <Button style={styles.skip} onPress={goBack} status="basic">
          <Text children="Skip" status="blue" />
        </Button>
        <Button
          children="Get Starter"
          style={styles.getStart}
          onPress={goBack}
        />
      </Layout>
    </Container>
  );
});

export default Onboarding09;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  skip: {
    marginTop: 16,
    marginRight: 16,
    flex: 1,
    // backgroundColor: "color-basic-100",
  },
  getStart: {
    marginTop: 16,
    flex: 1,
  },
  logo: {
    height: 48,
    width: 48,
  },
  btmView: {
    paddingHorizontal: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: "row",
  },
});

const dataO9 = [
  {
    id: 0,
    title: "Directly answer customers’ financial",
    des:
      "Open an app geared toward stock trading, and you’ll probably discover a dictionary of investing terms that rivals Investopedia.",
    image: Images.shake,
  },
  {
    id: 1,
    title: "Directly answer customers’ financial",
    des:
      "Open an app geared toward stock trading, and you’ll probably discover a dictionary of investing terms that rivals Investopedia.",
    image: Images.shake,
  },
  {
    id: 2,
    title: "Directly answer customers’ financial",
    des:
      "Open an app geared toward stock trading, and you’ll probably discover a dictionary of investing terms that rivals Investopedia.",
    image: Images.shake,
  },
];
