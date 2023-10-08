import React, { memo } from "react";
import { View, ColorValue, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Avatar,
  Button,
  Icon,
  useTheme,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
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

const Profile01 = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const translationY = useSharedValue(0);
  const AnimatedLayout = Animated.createAnimatedComponent(Layout);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });
  const input = [0, height * 0.06, height * 0.075, height * 0.09];

  const scaleY = useAnimatedStyle(() => {
    const transY = interpolate(
      translationY.value,
      input,
      [0, -150, -200, -300],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY: transY }],
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: height / 2.5,
      width: width,
    };
  }, []);

  const opacityHeader = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      input,
      [0, 0, 0.1, 1],
      Extrapolate.CLAMP
    );
    const transY = interpolate(
      translationY.value,
      input,
      [30, 20, 15, 0],
      Extrapolate.CLAMP
    );
    const scale = interpolate(translationY.value, input, [0, 0, 1, 1]);
    return {
      opacity: opacity,
      transform: [{ translateY: transY }, { scale: scale }],
      marginBottom: 8,
    };
  }, []);
  const scaleAvatar = useAnimatedStyle(() => {
    const scale = interpolate(translationY.value, input, [1, 0.9, 0.1, 0]);
    const opacity = interpolate(translationY.value, input, [1, 1, 0, 0]);
    return {
      transform: [{ scale: scale }],
      opacity: opacity,
    };
  }, []);
  const RenderItem = React.useCallback(({ item, onPress }: ItemProps) => {
    return (
      <TouchableOpacity activeOpacity={0.7}>
        <Layout style={styles.item} level="2">
          <View style={styles.itemText}>
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
          <Icon pack="assets" name={"arrowRight16"} style={[styles.titColor]} />
        </Layout>
      </TouchableOpacity>
    );
  }, []);
  const RenderHeader = React.useCallback(() => {
    return (
      <AnimatedLayout style={[styles.layout]} level="4">
        <Animated.View style={scaleAvatar}>
          <Avatar size="96" source={Images.avatar0} />
        </Animated.View>
        <Text
          children="Philip Schmidt"
          category="title3"
          status="white"
          marginTop={16}
          marginBottom={3}
        />
        <Text
          children="Total expense: $12,680.99"
          category="call-out"
          status="snow"
        />
        <Button
          style={styles.upgrade}
          children="Upgrade Premium"
          accessoryLeft={<Icon pack="assets" name="star" />}
        />
      </AnimatedLayout>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <AnimatedLayout style={scaleY} level="4" />
      <TopNavigation
        style={{
          backgroundColor: theme["background-basic-color-4"],
          paddingTop: top,
        }}
        accessoryLeft={
          <View style={styles.flexRow}>
            <NavigationAction marginLeft={4} icon="leftArrow" />
            <Animated.View style={opacityHeader}>
              <Avatar size="64" source={Images.avatar0} />
            </Animated.View>
            <Text
              status="primary"
              marginRight={16}
              category="call-out"
              children="Update"
            />
          </View>
        }
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <RenderHeader />
        {DATA_Profile01.map((item, index) => (
          <RenderItem item={item} key={index} />
        ))}
      </Animated.ScrollView>

      <Text
        children="Log out"
        uppercase
        center
        status="snow"
        onPress={goBack}
      />
    </Container>
  );
});

export default Profile01;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  itemText: {
    flexDirection: "row",
  },
  upgrade: {
    paddingHorizontal: 24,
    marginBottom: 32,
    marginTop: 16,
  },
  layout: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 20,
    justifyContent: "space-between",
    paddingRight: 16,
    marginHorizontal: 24,
  },
  titColor: {
    tintColor: "text-white-color",
  },
  icon: {
    borderRadius: 16,
    padding: 12,
    margin: 10,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
});
const DATA_Profile01 = [
  {
    id: 0,
    icon: "target2",
    title: "Goal Settings",
    color: "#4B9BAE",
  },
  {
    id: 1,
    icon: "worldWide",
    title: "Language",
    color: "#949398",
  },
  {
    id: 2,
    icon: "halfMoon",
    title: "Darkmode",
    color: "#215190",
  },
  {
    id: 3,
    icon: "star",
    title: "Sync Account",
    color: "#C06363",
  },
];
