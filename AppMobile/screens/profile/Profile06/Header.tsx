import React, { memo } from "react";
import { StyleSheet, useWindowDimensions, View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Button,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";

const Header = () => {
  const { goBack } = useNavigation();
  const { height, width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View>
      <Text center category="title4" marginTop={8} marginBottom={4}>
        Francis Dixon
      </Text>
      <Text center category="footnote" status="snow" uppercase>
        francisdixon@company.com
      </Text>
      <Layout level="2" style={[styles.flexRow, styles.layoutItem]}>
        <View style={styles.item}>
          <Text children="348" center category="title3" status="white" />
          <Text children="Following" center category="caption1" status="snow" />
        </View>
        <Layout
          style={{ backgroundColor: theme["color-basic-1300"], width: 1 }}
        />
        <View style={styles.item}>
          <Text children="195" center category="title3" status="white" />
          <Text children="Followers" center category="caption1" status="snow" />
        </View>
        <Layout
          style={{ backgroundColor: theme["color-basic-1300"], width: 1 }}
        />
        <View style={styles.item}>
          <Text children="875" center category="title3" status="white" />
          <Text children="Loves" center category="caption1" status="snow" />
        </View>
      </Layout>
      <View style={styles.viewButton}>
        <Button
          style={styles.btn}
          status="control"
          children="Message"
          accessoryLeft={<Icon pack="assets" name="star" />}
        />
        <Button
          style={styles.btnFollow}
          children="Following"
          accessoryLeft={<Icon pack="assets" name="addUser" />}
        />
      </View>
    </View>
  );
};

export default Header;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    marginVertical: 22,
  },
  layoutItem: {
    borderRadius: 12,
    paddingHorizontal: 32,
    marginTop: 16,
    marginHorizontal: 24,
  },
  viewButton: {
    flexDirection: "row",
    marginTop: 16,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  btnFollow: {
    flex: 1,
    marginLeft: 15,
  },
  btn: {
    flex: 1,
  },
});
