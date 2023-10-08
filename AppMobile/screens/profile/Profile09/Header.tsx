import React from "react";
import { View } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Button,
  Avatar,
  Layout,
} from "@ui-kitten/components";

import Text from "components/Text";
import { Images } from "assets/images";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import useLayout from "hooks/useLayout";
interface Props {
  translateY: Animated.SharedValue<number>;
}
const Header = ({ translateY }: Props) => {
  const styles = useStyleSheet(themedStyles);
  const { height, width } = useLayout();

  const input = [0, height * 0.082, height * 0.087, height * 0.09];
  const stylesAvatar = useAnimatedStyle(() => {
    const scale = interpolate(translateY.value, input, [1, 1, 0.5, 0]);
    const opacity = interpolate(translateY.value, input, [1, 0.5, 0, 0]);

    return {
      opacity: opacity,
      transform: [{ scale: scale }],
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text children="Christy Mcdonald" category="title3" status="white" />
          <Text
            children="Doctor Dentis"
            category="subhead"
            status="placeholder"
            marginBottom={4}
          />
          <View style={[styles.flexRow]}>
            <Icon pack="assets" name="pin" style={styles.iconPin} />
            <Text marginLeft={5.5} status="snow">
              1003 Sleepy Lake Swale
            </Text>
          </View>
        </View>
        <Animated.View style={stylesAvatar}>
          <Avatar
            /* @ts-ignore */
            style={styles.avatar}
            size="88"
            source={Images.avatar6}
          />
        </Animated.View>

        <Button
          accessoryRight={<Icon pack="assets" name="heart" />}
          status="danger"
          style={styles.heart}
        />
      </View>
      <View style={[styles.header, { marginTop: 26 }]}>
        <Button
          style={styles.buttonMeet}
          children="Meet Now"
          accessoryLeft={<Icon pack="assets" name="addUser" />}
        />
        <Button
          style={styles.btnChat}
          status="control"
          accessoryLeft={<Icon pack="assets" name="chat" />}
        />
        <Button
          status="success"
          accessoryLeft={<Icon pack="assets" name="headphone" />}
        />
      </View>
      <Text
        children="My Appointment"
        category="title4"
        status="snow"
        marginLeft={32}
        marginBottom={16}
        marginTop={33}
      />
      <Layout style={styles.layout} level="4">
        <View>
          <Text
            marginTop={16}
            marginBottom={8}
            children="Interview Maria Lana"
            category="headline"
            status="white"
          />
          <Text
            marginBottom={16}
            children="8:00 - 9:00 Jun 11"
            status="snow"
            category="body"
          />
        </View>
        <Avatar source={Images.avatar0} size="large" />
      </Layout>
      <View style={styles.flexRow}>
        <Text
          children="Achievement (18)"
          category="title4"
          status="white"
          marginLeft={32}
        />
        <Text status="primary" children="See All" marginRight={32} />
      </View>
    </View>
  );
};

export default Header;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  buttonMeet: {
    flex: 1,
    marginRight: 16,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heart: {
    position: "absolute",
    right: 0,
    bottom: 0,
    marginRight: 66,
  },
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 32,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  btnChat: {
    marginRight: 16,
  },
  avatar: {
    borderRadius: 24,
  },
  iconPin: {
    width: 16,
    height: 16,
    tintColor: "text-snow-color",
  },
  topNav: {
    paddingHorizontal: 4,
  },
  header: {
    marginLeft: 32,
    marginRight: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
