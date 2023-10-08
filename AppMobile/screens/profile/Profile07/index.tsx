import React, { memo } from "react";
import { View, FlatList, Animated } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  ViewPager,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import TabBar07 from "./TabBar07";
import Projects from "./Projects";
import useLayout from "hooks/useLayout";

const Profile07 = memo(() => {
  const theme = useTheme();
  const { height, width, bottom } = useLayout();
  const tabs = ["Projects", "Favorites", "Moodboard", "Following"];
  const styles = useStyleSheet(themedStyles);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const y = React.useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });

  const input = [0, height * 0.06, height * 0.065, height * 0.07];
  const scale = y.interpolate({
    inputRange: input,
    outputRange: [1, 1, 0.7, 0.7],
    extrapolate: "clamp",
  });
  const opacity = y.interpolate({
    inputRange: input,
    outputRange: [1, 0.6, 0, 0],
    extrapolate: "clamp",
  });
  const opacityHeader = y.interpolate({
    inputRange: input,
    outputRange: [0, 0, 0, 1],
    extrapolate: "clamp",
  });

  const transYAvatar = y.interpolate({
    inputRange: input,
    outputRange: [50, 30, 20, 0],
    extrapolate: "clamp",
  });
  const renderItem = React.useCallback(() => {
    return (
      <TabBar07
        tabs={tabs}
        style={{
          paddingLeft: 24,
          backgroundColor: theme["background-basic-color-1"],
          paddingBottom: 8,
        }}
        onChange={setActiveIndex}
        activeIndex={activeIndex}
      />
    );
  }, [activeIndex, setActiveIndex]);

  const renderHeader = React.useCallback(() => {
    return (
      <View style={styles.header}>
        <View>
          <Animated.View
            style={{
              opacity: opacity,
              transform: [{ scale: scale }],
            }}
          >
            <Avatar source={Images.avatar0} size="120" />
          </Animated.View>
          <NavigationAction
            icon="addUser"
            size="large"
            status="blue"
            backgroundColor={theme["color-primary-100"]}
            style={styles.addUser}
          />
        </View>
        <View style={styles.userView}>
          <Text children="Francis Dixon" category="title2" status="white" />
          <Text
            marginLeft={16}
            children="francisdixon@company.com"
            category="footnote"
            status="snow"
            marginBottom={18}
            uppercase
          />
          <View style={styles.social}>
            <NavigationAction
              size="large"
              icon="gg"
              backgroundColor="#FF647C"
              marginRight={16}
            />
            <NavigationAction
              size="large"
              icon="fb"
              backgroundColor="#6979F8"
            />
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryRight={
          <View style={[styles.flexRow, { width: width - 16 }]}>
            <NavigationAction />
            <Animated.View
              style={{
                opacity: opacityHeader,
                transform: [{ translateY: transYAvatar }],
                marginLeft: 32,
                marginBottom: 8,
              }}
            >
              <Avatar source={Images.avatar0} size="giant" />
            </Animated.View>
            <View style={styles.flexRow}>
              <NavigationAction />
              <NavigationAction icon="chat1" />
            </View>
          </View>
        }
      />
      <Animated.FlatList
        data={[1]}
        onScroll={onScroll}
        keyExtractor={(i, _) => _.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: bottom + 40 }}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        ListFooterComponent={() => {
          return (
            <ViewPager
              shouldLoadComponent={(index) => index === activeIndex}
              selectedIndex={activeIndex}
              onSelect={setActiveIndex}
            >
              <Projects index={activeIndex} />
              <Projects index={activeIndex} />
              <Projects index={activeIndex} />
              <Projects index={activeIndex} />
            </ViewPager>
          );
        }}
      />
    </Container>
  );
});

export default Profile07;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNav: {
    marginHorizontal: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addUser: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  social: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  userView: {
    alignItems: "flex-end",
  },
});
