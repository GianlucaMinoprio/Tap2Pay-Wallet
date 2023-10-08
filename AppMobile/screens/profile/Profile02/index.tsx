import React, { memo } from "react";
import { View, TouchableOpacity, ColorValue, Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import CardWeight from "./CardWeight";
import CardSteak from "./CardSteak";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import useLayout from "hooks/useLayout";

interface Props {
  id: number;
  title: string;
  icon: string;
  color: ColorValue | string;
}
interface ItemProps {
  item: Props;
  onPress?(): void;
}
const Profile02 = memo(() => {
  const { height, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });
  const input = [0, height * 0.07, height * 0.075, height * 0.08];
  const opacityHeader = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      input,
      [0, 0, 0.5, 1],
      Extrapolate.CLAMP
    );
    const transY = interpolate(
      translateY.value,
      input,
      [40, 40, 15, 0],
      Extrapolate.CLAMP
    );
    const scale = interpolate(translateY.value, input, [0, 0, 1, 1]);
    return {
      opacity: opacity,
      transform: [{ translateY: transY }, { scale: scale }],
    };
  }, []);
  const scaleAvatar = useAnimatedStyle(() => {
    const scale = interpolate(translateY.value, input, [1, 1, 0, 0]);
    return {
      transform: [{ scale: scale }],
    };
  }, []);

  const RenderItem = React.useCallback(({ item, onPress }: ItemProps) => {
    return (
      <TouchableOpacity activeOpacity={0.7}>
        <Layout style={styles.item} level="2">
          <View style={styles.flexRow}>
            <View style={[styles.icon, { backgroundColor: item.color }]}>
              <Icon pack="assets" name={item.icon} style={styles.titColor} />
            </View>
            <Text
              marginTop={23}
              marginLeft={8}
              children={item.title}
              category="headline"
            />
          </View>
          <Icon pack="assets" name={"arrowRight16"} style={styles.titColor} />
        </Layout>
      </TouchableOpacity>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={
          <View style={styles.topNav}>
            <NavigationAction marginLeft={4} icon="leftArrow" />
            <Animated.View style={[opacityHeader, styles.animatedTop]}>
              {/* <Avatar source={Images.avatar0} size="40" /> */}
              <Text
                children="Christy Mcdonald"
                category="call-out"
                marginLeft={12}
                status="white"
              />
            </Animated.View>
            <View style={styles.flexRow}>
              <NavigationAction marginRight={-8} />
              <NavigationAction icon="settings" />
            </View>
          </View>
        }
      />
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        <Animated.View style={scaleAvatar}>
          <View style={styles.viewAvatar}>
            <Avatar
              source={Images.avatar0}
              size="64"
              /* @ts-ignore */
              style={styles.avatar}
            />
            <View>
              <Text
                children="Christy Mcdonald"
                category="title3"
                marginLeft={12}
                status="white"
              />
              <Text
                children="Total expense: $12,680.99"
                marginTop={3}
                category="subhead"
                status="snow"
                marginLeft={12}
              />
            </View>
          </View>
        </Animated.View>

        <CardWeight />
        <CardSteak />
        {data.map((item, index) => (
          <View style={{ paddingHorizontal: 24 }} key={index}>
            <RenderItem item={item} />
          </View>
        ))}
      </Animated.ScrollView>
      <Layout level="2" style={[styles.bottomTab, { paddingBottom: bottom }]}>
        <NavigationAction icon="calendar" status="snow" />
        <NavigationAction icon="beachHouse" status="snow" />
        <Image
          source={Images.logo4}
          /* @ts-ignore */
          style={styles.logo}
        />
        <NavigationAction icon="fire" status="snow" />
        <NavigationAction icon="user" status="primary" />
      </Layout>
    </Container>
  );
});

export default Profile02;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  bottomTab: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 2,
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    paddingBottom: 120,
  },
  logo: {
    width: 40,
    height: 40,
    marginTop: 8,
  },
  avatar: {
    borderRadius: 24,
  },
  flexRow: {
    flexDirection: "row",
  },
  animatedTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 12,
  },

  viewAvatar: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 32,
    marginTop: 24,
    marginBottom: 32,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    marginTop: 16,
    justifyContent: "space-between",
    paddingRight: 16,
  },
  titColor: {
    tintColor: "text-white-color",
  },
  icon: {
    borderRadius: 16,
    padding: 12,
    margin: 10,
  },
});

const data = [
  {
    id: 0,
    title: "Goal Settings",
    icon: "target2",
    color: "#4B9BAE",
  },
  {
    id: 1,
    title: "Favorites",
    icon: "star",
    color: "#949398",
  },
];
