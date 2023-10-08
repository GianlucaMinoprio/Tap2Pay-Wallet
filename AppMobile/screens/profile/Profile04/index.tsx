import React, { memo } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import {
  useTheme,
  Avatar,
  Layout,
  Button,
  TopNavigation,
} from "@ui-kitten/components";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";

import { Images } from "assets/images";

const Profile04 = memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { width, bottom, top, height } = useLayout();

  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  const data = [
    {
      title: "Project done",
      number: 348,
    },
    {
      title: "Happy client",
      number: 195,
    },
    {
      title: "Hour working",
      number: 870,
    },
  ];

  const style = useAnimatedStyle(() => {
    const heightAnim = interpolate(
      translationY.value,
      [-100, 0],
      [height / 2 + 100, height / 2],
      Extrapolate.CLAMP
    );

    const top = interpolate(
      translationY.value,
      [0, height],
      [0, -height],
      Extrapolate.CLAMP
    );

    return {
      position: "absolute",
      left: 0,
      width: width,
      resizeMode: "cover",
      height: heightAnim,
      top: top,
    };
  });

  return (
    <Container useSafeArea={false}>
      <Animated.Image
        source={Images.toyFace6}
        style={style}
        resizeMode="cover"
      />
      <TopNavigation
        appearance="control"
        style={[styles.header, { top: top }]}
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        accessoryRight={
          <View style={styles.row}>
            <NavigationAction marginRight={-8}/>
            <NavigationAction icon="settings" marginRight={4} />
          </View>
        }
      />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Layout style={[styles.content, { marginTop: height / 2 - 20 }]}>
          <Avatar
            source={Images.avatar4}
            size="80"
            style={[
              styles.avatar,
              { borderColor: theme["background-basic-color-1"] },
            ]}
          />
          <ImageBackground source={Images.bg} style={styles.label}>
            <Text
              children="$25"
              status="blue"
              category="header"
              center
              marginTop={20}
            />
            <Text
              children="per hours"
              status="blue"
              center
              category="subhead"
            />
          </ImageBackground>
          <View style={styles.viewName}>
            <Text marginTop={16} category="header" status="white">
              Marion Harrison
            </Text>
          </View>
          <Text category="call-out" status="snow" marginTop={8}>
            Digital Marketing
          </Text>
          <Layout level="2" style={styles.box}>
            {data &&
              data.map((i, index) => {
                const { title, number } = i;
                return (
                  <View
                    key={index}
                    style={[
                      styles.item,
                      {
                        borderRightColor:
                          index < data.length - 1
                            ? theme["background-basic-color-7"]
                            : "transparent",
                      },
                    ]}
                  >
                    <Text center category="title3" status="white">
                      {number}
                    </Text>
                    <Text center category="caption1" status="snow">
                      {title}
                    </Text>
                  </View>
                );
              })}
          </Layout>
        </Layout>
      </Animated.ScrollView>
      <Layout style={[styles.buttonView, { paddingBottom: bottom + 16 }]}>
        <Button children="Hire Now!" size="large" onPress={goBack} />
      </Layout>
    </Container>
  );
});

export default Profile04;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  avatar: {
    borderWidth: 2,
    marginTop: -40,
  },
  label: {
    width: 88,
    height: 112,
    position: "absolute",
    right: 24,
  },
  viewName: {
    width: "50%",
    marginRight: 24,
  },
  box: {
    marginTop: 24,
    borderRadius: 12,
    flexDirection: "row",
    overflow: "hidden",
  },
  item: {
    flex: 1,
    paddingVertical: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
  },
  header: {
    position: "absolute",
    right: 0,
    left: 0,
    zIndex: 10,
  },
  row: {
    flexDirection: "row",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonView: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
});
