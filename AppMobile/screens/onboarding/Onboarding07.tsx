import React, { memo } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  ScrollView,
} from "react-native";
import {
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
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Dots from "../../components/Dots";
import Card from "./Card";
import { PageOnBoarding7 } from "constants/Data";

const Onboarding07 = memo(() => {
  const { goBack } = useNavigation();
  const { height, width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const translationX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });
  const snapToOffsets = [0, 400];
  const style = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translationX.value,
      PageOnBoarding7.map((_, i) => (width - 50) * i),
      PageOnBoarding7.map((product) => product.color)
    ) as string;
    return { backgroundColor, flex: 1 };
  });
  return (
    <Container style={styles.container}>
      <View style={[{ height: height }, style]}>
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          decelerationRate="fast"
          contentContainerStyle={styles.content}
          snapToInterval={width - 80}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {PageOnBoarding7.map((product, index) => (
            <Card x={translationX} product={product} key={index} />
          ))}
        </Animated.ScrollView>
      </View>

      <View style={styles.bottomView}>
        <Dots
          translationValue={translationX}
          data={PageOnBoarding7}
          style={styles.dot}
          status="primary"
          heightDot={6}
          widthDot={6}
          widthInterpolate={6}
        />
        <Button
          size="large"
          children="Get Starter"
          style={{ flex: 1, marginLeft: 46 }}
          onPress={goBack}
          status="primary"
        />
      </View>
    </Container>
  );
});

export default Onboarding07;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingLeft: 16,
  },
  content: {
    paddingRight: 60,
    paddingLeft: 16,
  },
  bottomView: {
    paddingBottom: 16,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 32,
    marginRight: 24,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 16,
  },
  dot: {
    marginRight: 46,
  },
  animated: {
    flexDirection: "row",
    paddingLeft: 16,
  },
});
