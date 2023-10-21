import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Button,
} from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AuthStackParamList, RootStackParamList } from "navigation/type";

import Text from "components/Text";
import Container from "components/Container";
import { Images } from "assets/images";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import useLayout from "hooks/useLayout";


const Onboarding04 = memo(() => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });

  const handleSkip = () => {
    navigation.navigate('Auth', { screen: 'SignIn' });
  }

  return (
    <Container style={styles.container} level="4">
      <TopNavigation
        style={styles.topNav}
        accessoryRight={() => (
          <Button
            onPress={handleSkip}
            style={styles.btnNav}
            status="success"
            accessoryRight={() => (
              <Icon
                pack="assets"
                name="rightArrow"
                style={{ tintColor: theme["text-primary-color"] }}
              />
            )}
          />
        )}
      />

      <View style={styles.step}>
        {PageOnBoarding4.map((i, index) => {
          const stepColor = useDerivedValue(() => {
            return interpolateColor(
              translationX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              ["#4D7", "#FFFFFF", "#4D7"]
            );
          });
          const stepFontSize = useDerivedValue(() => {
            return interpolate(
              translationX.value,
              [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
                (index + 2) * width,
              ],
              [18, 36, 16, 16],
              Extrapolate.CLAMP
            );
          });

          const stepStyle = useAnimatedStyle(() => {
            return {
              color: stepColor.value,
              fontSize: stepFontSize.value,
              backgroundColor: "transparent",
              marginRight: 24,
            };
          });
          return (
            <View key={index} style={styles.number}>
              <Animated.Text style={stepStyle}>0{i.id + 1}</Animated.Text>
            </View>
          );
        })}
      </View>
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
        contentContainerStyle={{ width: width * 4, justifyContent: "center" }}
      >
        {PageOnBoarding4.map((i, index) => {
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
              paddingHorizontal: 40,
            };
          });
          return (
            <Animated.View key={index} style={style}>
              <Text uppercase category="title2" status="white">
                {i.title}
              </Text>
              <Text marginTop={8} category={"body"} status={"white"}>
                {i.description}
              </Text>
              <Image
                source={i.image}
                /* @ts-ignore */
                style={styles.image}
                resizeMode="contain"  //a voir
              />
              <Animated.View
                style={[
                  {
                    width: width * 4,
                    bottom: 92 * (height / 812),
                    height: 280 * (height / 812),
                  },
                  styles.imageView,
                ]}
              />
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

      <View style={{ paddingBottom: bottom + 12 }}>
        <Text
          status="primary"
          uppercase
          category="title4"
          center
          onPress={handleSkip}
        >
          skip now
        </Text>
      </View>
    </Container>
  );
});

export default Onboarding04;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  btnNav: {
    backgroundColor: "color-patrick-blue-100",
    width: 64,
    height: 64,
    borderRadius: 99,
  },
  step: {
    flexDirection: "row",
    marginLeft: 24,
  },
  iconNavigation: {
    tintColor: "color-primary-100",
  },
  topNav: {
    backgroundColor: "transparent",
    zIndex: 10,
    paddingRight: 24,
  },
  image: {
    marginTop: 30,
    width: 300,
    height: 300,
  },
  number: {
    justifyContent: "flex-end",
    marginBottom: 8,
    marginTop: 8,
  },
  imageView: {
    flexDirection: "row",
    marginLeft: 40,
    backgroundColor: "color-primary-200",
    borderTopLeftRadius: 140,
    borderBottomLeftRadius: 140,
    position: "absolute",
    zIndex: -10,
  },
});
const PageOnBoarding4 = [
  {
    id: 0,
    image: Images.ob1_nbg,
    title: "Welcome to Tap2Pay",
    description:
      "With our application, paying in digital currency has never been easier.",
  },
  {
    id: 1,
    image: Images.ultrasonic_nbg,
    title: "Ultrasonic technology",
    description:
      "Send and receive money instantly via ultrasound - your microphone is the key!",
  },
  {
    id: 2,
    image: Images.AA_nbg,
    title: "Account Abstraction",
    description:
      "Thanks to AA technology, your transactions are simplified and universal.",
  },
  {
    id: 3,
    image: Images.uses_nbg,
    title: "Multiple uses",
    description:
      "Person-to-person or in-store, make every transaction easier with our solution.",
  },
];
