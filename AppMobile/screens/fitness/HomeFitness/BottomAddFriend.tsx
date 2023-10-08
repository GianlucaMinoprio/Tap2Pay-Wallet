import React from "react";
import { View, TouchableOpacity, ImageSourcePropType } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  Avatar,
} from "@ui-kitten/components";
import Text from "components/Text";

interface Props {
  onPress?(): void;
  data: ImageSourcePropType[];
  pressAddFriend?(): void;
}

const BottomAddFriend = ({ onPress, data, pressAddFriend }: Props) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Layout level="4" style={styles.layout}>
        <View style={styles.topLayout}>
          <Text children="Run with friends" category="title3" status="white" />
          <TouchableOpacity activeOpacity={0.7}>
            <Icon pack="assets" name="arrowRightCircle" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.friendView}>
          {data.map((item, index) => {
            return (
              <Avatar
                size="32"
                key={index}
                source={item}
                /* @ts-ignore */
                style={styles.avatar}
              />
            );
          })}
          <TouchableOpacity onPress={pressAddFriend} activeOpacity={0.7}>
            <Icon
              pack="assets"
              name="plusCircle"
              style={styles.iconAddFriend}
            />
          </TouchableOpacity>
        </View>
      </Layout>
    </TouchableOpacity>
  );
};

export default BottomAddFriend;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topLayout: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 17,
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 6,
  },
  layout: {
    marginHorizontal: 24,
    marginTop: 32,
    borderRadius: 16,
  },
  icon: {
    tintColor: "text-white-color",
  },
  friendView: {
    flexDirection: "row",
    marginBottom: 16,
    marginLeft: 16,
  },
  avatar: {
    marginRight: 4,
  },
  iconAddFriend: {
    tintColor: "text-white-color",
    width: 32,
    height: 32,
    marginLeft: 4,
  },
});
