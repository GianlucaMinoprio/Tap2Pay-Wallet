import React, { memo } from "react";
import { View, Image, ScrollView } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Avatar,
  Button,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
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

const Profile08 = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });
  const input = [0, height * 0.082, height * 0.087, height * 0.09];
  const opacityHeader = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      input,
      [-1, 0, 0.8, 1],
      Extrapolate.CLAMP
    );
    const transY = interpolate(
      translateY.value,
      input,
      [30, 20, 0, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity: opacity,
      transform: [{ translateY: transY }],
      position: "absolute",
      bottom: 0,
      left: width / 2.45,
    };
  }, []);
  const stylesAvatar = useAnimatedStyle(() => {
    const scale = interpolate(translateY.value, input, [1, 1, 0, 0]);
    const opacity = interpolate(
      translateY.value,
      input,
      [1, 1, 0.1, 0],
      Extrapolate.IDENTITY
    );

    return {
      opacity: opacity,
      transform: [{ scale: scale }],
    };
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryRight={
          <View style={[styles.flexRow, { width: width - 8 }]}>
            <NavigationAction icon="insurance" />
            <Animated.View style={opacityHeader}>
              <Avatar
                source={Images.avatar0}
                size="giant"
                /* @ts-ignore */
                style={styles.avatar}
              />
            </Animated.View>
            <View style={styles.flexRow}>
              <NavigationAction marginRight={-8}/>
              <NavigationAction icon="question" />
            </View>
          </View>
        }
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Animated.View style={stylesAvatar}>
            <Avatar
              source={Images.avatar0}
              size="80"
              /* @ts-ignore */
              style={styles.avatar}
            />
          </Animated.View>

          <View style={styles.nameView}>
            <Text
              children="Christy Mcdonald"
              category="title3"
              status="white"
              center
            />
            <Button
              size="tiny"
              style={styles.checked}
              status="control"
              accessoryRight={<Icon pack="assets" name="checked" />}
            />
          </View>
          <Text
            children="Total expense: $12,680.99"
            category="subhead"
            status="snow"
            marginTop={3}
          />
          <Button
            children="Following"
            style={styles.follow}
            accessoryLeft={<Icon pack="assets" name="addUser" />}
          />
          <Text status="white" category="title4" marginBottom={16}>
            My Portfolios
            <Text children="(128+)" status="snow" category="title4" />
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.viewPhoto}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {DATA_Profile08.map((i, _) => {
            return (
              <Image
                source={i.image}
                key={_}
                /* @ts-ignore */
                style={styles.photo}
              />
            );
          })}
        </ScrollView>
        <Text
          children="Information"
          category="title4"
          status="white"
          marginTop={32}
          marginBottom={16}
          marginLeft={40}
        />
        <Text category="body" status="snow" marginRight={24} marginLeft={40}>
          The finance world can be a tough place for a marketer. Creating
          inspiring finance content marketing that communicates your brand's
          messages, engages customers and keeps the compliance team happy...
        </Text>
      </Animated.ScrollView>
      <NavigationAction
        icon="downArrow"
        status="primary"
        marginLeft={24}
        marginTop={34}
        style={{ position: "absolute", bottom: bottom + 16 }}
      />
    </Container>
  );
});

export default Profile08;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingBottom: 120,
  },
  nameView: {
    flexDirection: "row",
    alignItem: "center",
  },
  checked: {
    backgroundColor: "#6979F8",
    borderRadium: 24,
    width: 32,
    height: 32,
    marginLeft: 12,
  },
  avatar: {
    borderRadius: 24,
    marginBottom: 12,
  },
  topNav: {
    marginHorizontal: 8,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    paddingLeft: 40,
    paddingTop: 12,
  },
  viewPhoto: {
    paddingHorizontal: 40,
  },
  follow: {
    width: 156,
    marginTop: 16,
    marginBottom: 32,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 8,
  },
});
const DATA_Profile08 = [
  {
    id: 0,
    image: Images.rectangle1,
  },
  {
    id: 1,
    image: Images.rectangle2,
  },
  {
    id: 2,
    image: Images.rectangle4,
  },
  {
    id: 3,
    image: Images.rectangle3,
  },
];
