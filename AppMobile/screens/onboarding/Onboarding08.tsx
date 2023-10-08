import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Button,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Container from "components/Container";
import { Images } from "assets/images";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import DotsColumn from "../../components/DotsColumn";

const Onboarding08 = memo(() => {
  const { goBack } = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const styles = useStyleSheet(themedStyles);

  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  return (
    <Container style={[styles.container]}>
      <View>
        <DotsColumn
          style={styles.dot}
          data={PageOnBoarding8}
          translationValue={translationY}
          heightInterpolate={90}
          heightItem={345}
        />
      </View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        snapToInterval={332}
        decelerationRate="fast"
      >
        {PageOnBoarding8.map((i, index) => {
          return (
            <View
              key={index}
              style={[styles.card, { backgroundColor: i.color }]}
            >
              <Image
                source={i.image}
                /* @ts-ignore */
                style={styles.image}
              />
              <View style={styles.textView}>
                <Text category="title3" marginTop={26}>
                  {i.title}{" "}
                </Text>
                <Text
                  marginBottom={40}
                  category="call-out"
                  marginTop={12}
                  status="snow"
                >
                  {i.description}
                </Text>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>
      <Button
        onPress={goBack}
        status="primary"
        accessoryRight={(props) => (
          <Icon {...props} pack="assets" name="rightArrow" />
        )}
        children={"Go Now"}
        size="medium"
        style={[
          styles.button,
          {
            bottom: bottom + 16,
          },
        ]}
      />
    </Container>
  );
});

export default Onboarding08;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 0,
  },
  textView: {
    marginLeft: 24,
    marginRight: 32,
  },
  image: {
    alignSelf: "flex-end",
    marginRight: 32,
    marginTop: 44,
  },
  content: {
    paddingBottom: 108,
  },
  button: {
    position: "absolute",
    width: 133,
    marginLeft: 24,
  },
  card: {
    borderRadius: 16,
    marginRight: 24,
    marginBottom: 16,
  },
  dot: {
    marginLeft: 24,
    marginRight: 28,
  },
});
const PageOnBoarding8 = [
  {
    id: 0,
    image: Images.gloss,
    color: "#215190",
    title: "Make complex financial information accessible",
    description:
      "Using search insight and research data to find out which finance topics customers",
  },
  {
    id: 1,
    image: Images.heart,
    color: "#4B9BAE",
    title: "Create interactive financial content",
    description:
      "is arguably the most powerful starting point when planning finance content.",
  },
  {
    id: 2,
    color: "#FFF279",
    image: Images.gloss,
    title: "Create interactive financial content",
    description:
      "is arguably the most powerful starting point when planning finance content.",
  },
  {
    id: 3,
    color: "#C06379",
    image: Images.heart,
    title: "Make complex financial information accessible",
    description:
      "Using search insight and research data to find out which finance topics customers",
  },
];
