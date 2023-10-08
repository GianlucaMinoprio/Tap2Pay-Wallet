import React, { memo } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Avatar,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import Dots from "components/Dots";
import { Images } from "assets/images";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import ReactionsButton from "components/ReactionsButton";
import NavigationAction from "components/NavigationAction";
import useLayout from "hooks/useLayout";

const Story = memo(() => {
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
    if (activeIndex.value === DATA_Story.length - 1) return;
    scrollRef.current?.scrollTo({ x: width * (activeIndex.value + 1) });
  }, [activeIndex]);
  const onIconPressPrv = React.useCallback(() => {
    if (activeIndex.value > DATA_Story.length) return;
    scrollRef.current?.scrollTo({ x: width * (activeIndex.value - 1) });
  }, [activeIndex]);

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={() => (
          <Dots
            data={DATA_Story}
            widthInterpolate={44}
            widthDot={44}
            translationValue={translationX}
          />
        )}
      />

      <View style={[{ flex: 1 }]}>
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
          contentContainerStyle={{ width: width * DATA_Story.length }}
        >
          <Animated.View style={[{ flexDirection: "row" }]}>
            {DATA_Story.map((i, _) => {
              return (
                <View key={_}>
                  <TouchableWithoutFeedback onPress={onIconPressPrv}>
                    <View
                      style={[
                        styles.prv,
                        {
                          width: width / 2,
                          height: height / 1.7,
                        },
                      ]}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={onIconPressNext}>
                    <View
                      style={[
                        styles.next,
                        {
                          width: width / 2,
                          height: height / 1.7,
                        },
                      ]}
                    />
                  </TouchableWithoutFeedback>
                  <View style={{ width: width, borderRadius: 12 }}>
                    <View
                      style={[
                        styles.viewAvatar,
                        {
                          width: width - 24,
                        },
                      ]}
                    >
                      <Avatar
                        size="32"
                        source={i.avatar}
                        /* @ts-ignore */
                        style={styles.avatar}
                      />
                      <NavigationAction style={{ zIndex: 10 }} />
                    </View>
                    <Image
                      source={i.image}
                      style={{
                        width: width - 32,
                        height: height / 1.5,
                        alignSelf: "center",
                        flexDirection: "row",
                        borderRadius: 12,
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </Animated.View>
        </Animated.ScrollView>
        <TouchableOpacity style={styles.link}>
          <Icon pack="assets" name="link" style={styles.colorLink} />
          <Text status="salmon" children="direct link here" marginLeft={8} />
        </TouchableOpacity>
        <ReactionsButton style={{ marginBottom: bottom + 12, marginLeft: 8 }} />
      </View>
    </Container>
  );
});

export default Story;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  viewAvatar: {
    position: "absolute",
    flexDirection: "row",
    zIndex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    flexDirection: "row",
    marginLeft: 24,
    alignItems: "center",
    marginTop: 16,
  },
  colorLink: {
    tintColor: "color-salmon-100",
    width: 16,
    height: 16,
  },
  avatar: {
    marginLeft: 32,
  },
  prv: {
    zIndex: 1,
    position: "absolute",
    bottom: 0,
  },
  next: {
    position: "absolute",
    right: 0,
    zIndex: 1,
    bottom: 0,
  },
});
const DATA_Story = [
  {
    id: 0,
    image: Images.rectangle4,
    avatar: Images.toyFace3,
  },
  {
    id: 1,
    image: Images.rectangle1,
    avatar: Images.toyFace,
  },
  {
    id: 2,
    image: Images.rectangle1,
    avatar: Images.toyFace1,
  },
  {
    id: 3,
    image: Images.rectangle1,
    avatar: Images.toyFace2,
  },
  {
    id: 4,
    image: Images.rectangle1,
    avatar: Images.toyFace3,
  },
  {
    id: 5,
    image: Images.rectangle1,
    avatar: Images.toyFace2,
  },
  {
    id: 6,
    avatar: Images.toyFace1,
    image: Images.rectangle4,
  },
];
