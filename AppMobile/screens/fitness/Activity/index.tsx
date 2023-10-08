import React, { memo } from "react";
import { ScrollView, View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  useTheme,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";
import ActivityItem from "./ActivityItem";
import { RefreshControl } from "react-native-web-refresh-control";

const Activity = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container} level="2">
      <Layout
        level="1"
        style={{
          position: "absolute",
          height: height / 2,
          top: 0,
          width: width,
        }}
      />
      <TopNavigation
        style={[styles.topNav, { paddingTop: top }]}
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        accessoryRight={<Avatar source={Images.avatar9} size="medium" />}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + 40 }}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      >
        <Layout style={styles.title} level="1">
          <Text children="History" category="title1" marginTop={6} />
          <Text category="headline" status="placeholder" marginTop={10}>
            track your activity daily, weekly, monthly
          </Text>
        </Layout>
        <Layout level="2" style={styles.content}>
          <View style={styles.status}>
            <Text children="Day" status="snow" category="h6" uppercase />
            <Text
              children="Distance"
              status="snow"
              category="h6"
              uppercase
              marginLeft={44}
            />
            <Text
              children="Time"
              status="snow"
              category="h6"
              uppercase
              marginLeft={40}
            />
            <Text
              children="Route"
              status="snow"
              category="h6"
              uppercase
              marginLeft={80}
            />
          </View>
          {DATA.map((item, index) => {
            return <ActivityItem data={item} key={index} />;
          })}
        </Layout>
      </ScrollView>
    </Container>
  );
});

export default Activity;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    paddingTop: 0,
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    flex: 1,
  },
  topNav: {
    paddingRight: 16,
    paddingLeft: 4,
  },
  title: {
    paddingTop: 6,
    paddingLeft: 32,
    paddingBottom: 48,
  },
  status: {
    flexDirection: "row",
    marginLeft: 28,
    marginRight: 32,
    marginTop: 16,
    marginBottom: 24,
  },
});
const DATA = [
  { id: 0, day: 1624961449000, km: 2.56, time: "10:25", route: Images.vector1 },
  { id: 1, day: 1624961449000, km: 2.56, time: "10:25", route: Images.vector1 },
  { id: 2, day: 1624961449000, km: 2.56, time: "10:25", route: Images.vector1 },
  { id: 3, day: 1624961449000, km: 2.56, time: "10:25", route: Images.vector1 },
  { id: 4, day: 1624961449000, km: 2.56, time: "10:25", route: Images.vector1 },
  { id: 5, day: 1624961449000, km: 2.56, time: "10:25", route: Images.vector1 },
];
