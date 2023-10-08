import React, { memo } from "react";
import {
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
  Icon,
  Avatar,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import Header from "./Header";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import useLayout from "hooks/useLayout";

const Profile09 = memo(() => {
  const theme = useTheme();
  const { width, height } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const DATA_Achieve = [
    {
      id: 0,
      image: Images.baby,
      color: theme["color-radical-600"],
    },
    {
      id: 1,
      image: Images.wale,
      color: theme["color-emerald-100"],
    },
    {
      id: 2,
      image: Images.avocado,
      color: theme["color-salmon-100"],
    },
    {
      id: 3,
      image: Images.medal,
      color: theme["color-patrick-blue-100"],
    },
    {
      id: 3,
      image: Images.baby,
      color: theme["color-primary-100"],
    },
  ];

  const [data, setData] = React.useState(DATA_Achieve);
  const [dataAlbum, setDataAlbum] = React.useState(DATA_Album);
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });
  const input = [0, height * 0.082, height * 0.087, height * 0.09];
  const opacityHeader = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      input,
      [0, 0, 0.1, 1],
      Extrapolate.CLAMP
    );
    const transY = interpolate(
      translateY.value,
      input,
      [30, 20, 10, 0],
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

  return (
    <Container style={styles.container}>
      <TopNavigation
        appearance="control"
        style={styles.topNav}
        accessoryRight={
          <View style={[styles.flexRow, { width: width - 8 }]}>
            <NavigationAction icon="menu" />
            <Animated.View style={opacityHeader}>
              <Avatar source={Images.avatar6} />
            </Animated.View>
            <View style={styles.flexRow}>
              <NavigationAction marginRight={-8} />
              <NavigationAction icon="notification" />
            </View>
          </View>
        }
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Header translateY={translateY} />
        <ScrollView
          horizontal
          contentContainerStyle={styles.achieve}
          showsHorizontalScrollIndicator={false}
        >
          {data.map((item, index) => {
            return (
              <Button
                key={index}
                activeOpacity={0.7}
                style={[
                  {
                    backgroundColor: item.color,
                  },
                  styles.button,
                ]}
                accessoryRight={() => <Image source={item.image} />}
              />
            );
          })}
        </ScrollView>
        <View style={styles.header}>
          <Text children="Videos & Photos" category="title4" status="white" />
          <Text children="See All" category="headline" status="primary" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentAlbum}
        >
          {dataAlbum.map((item, index) => {
            return (
              <ImageBackground
                /* @ts-ignore */
                imageStyle={styles.imgStyle}
                source={item.image}
                style={styles.imgBackground}
                key={index}
              >
                <TouchableOpacity style={styles.albumLength}>
                  <Icon pack="assets" name="image" style={styles.iconImage} />
                  <Text
                    children={item.lengthAblum}
                    status="white"
                    category="headline"
                    marginVertical={5}
                    marginLeft={4}
                  />
                </TouchableOpacity>
              </ImageBackground>
            );
          })}
        </ScrollView>
      </Animated.ScrollView>
    </Container>
  );
});

export default Profile09;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  flexRow: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  topNav: {
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  achieve: {
    paddingLeft: 32,
    marginTop: 16,
    marginBottom: 32,
  },
  button: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  header: {
    marginLeft: 32,
    marginRight: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imgStyle: {
    borderRadius: 8,
  },
  contentAlbum: {
    marginLeft: 32,
    paddingRight: 32,
    marginTop: 16,
    paddingBottom: 24,
  },
  albumLength: {
    backgroundColor: "background-basic-color-4",
    flexDirection: "row",
    width: 56,
    alignItems: "center",
    borderRadius: 8,
    alignSelf: "flex-end",
    marginBottom: 8,
    marginRight: 8,
  },
  imgBackground: {
    width: 240,
    height: 135,
    marginRight: 16,
    justifyContent: "flex-end",
  },
  iconImage: {
    tintColor: "text-white-color",
    width: 16,
    height: 16,
    marginLeft: 8,
  },
});
const DATA_Album = [
  {
    id: 0,
    image: Images.rectangle6,
    lengthAblum: 24,
  },
  {
    id: 1,
    image: Images.rectangle7,
    lengthAblum: 24,
  },
  {
    id: 2,
    image: Images.rectangle6,
    lengthAblum: 24,
  },
];
