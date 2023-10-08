import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import TabBar from "./TabBar";
import { RefreshControl } from "react-native-web-refresh-control";

const ReadingHome = memo(() => {
  const { bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="settings" marginLeft={4} />}
        accessoryRight={
          <Avatar
            source={Images.avatar0}
            /* @ts-ignore */
            style={styles.avatar}
          />
        }
      />
      <Text category="title2" status="white" marginLeft={16} marginTop={-8}>
        For You
      </Text>

      <Content
        contentContainerStyle={{ paddingBottom: bottom + 24 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      >
        <View style={styles.header}>
          <Image source={Images.readingHome} />
          <Layout style={styles.layout} level="5" />
        </View>
        <Text category="body" status="snow" center marginTop={56}>
          Listen and relax your soul
        </Text>
        <Text category="body" status="placeholder" center>
          2:35
        </Text>
        <Text category="title4" status="white" marginTop={32} marginLeft={16}>
          Following Categories
        </Text>
        <TabBar
          tabs={DATA_TABS}
          style={styles.tabBar}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />
        <Layout level="2" style={styles.card}>
          <Layout
            style={[
              { backgroundColor: theme["color-radical-700"] },
              styles.redLayout,
            ]}
          >
            <Image source={Images.saly45} />
          </Layout>
          <View style={styles.title}>
            <View>
              <Text category="title4" status="white">
                The wolrd, your life
              </Text>
              <Text category="subhead" status="grey500" marginTop={4}>
                June Cook
              </Text>
            </View>
            <View style={styles.flexRow}>
              <View style={styles.flexRow}>
                <Icon
                  name="headphone"
                  pack="assets"
                  style={{ tintColor: theme["text-primary-color"] }}
                />
                <Text category="subhead" status="white" marginLeft={8}>
                  48mins
                </Text>
              </View>
              <Icon
                name="bookmark"
                pack="assets"
                style={{ tintColor: theme["icon-input-basic-color"] }}
              />
            </View>
          </View>
        </Layout>
      </Content>
    </Container>
  );
});

export default ReadingHome;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  header: {
    alignItems: "center",
  },
  avatar: {
    borderRadius: 20,
    width: 48,
    height: 48,
    marginRight: 24,
  },
  layout: {
    width: 175,
    height: 175,
    borderRadius: 99,
    position: "absolute",
    zIndex: -10,
    bottom: -40,
  },
  tabBar: {
    paddingLeft: 16,
  },
  redLayout: {
    paddingTop: 36,
    borderRadius: 4,
    marginVertical: 18,
    marginHorizontal: 16,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    justifyContent: "space-between",
    marginVertical: 24,
    flex: 1,
    paddingRight: 24,
  },
  card: {
    flexDirection: "row",
    marginTop: 16,
    borderRadius: 8,
    marginHorizontal: 16,
  },
});
const DATA_TABS = [
  { id: 0, title: "Finance", icon: "insurance" },
  { id: 1, title: "Future Life", icon: "insurance" },
  { id: 2, title: "Technology", icon: "insurance" },
  { id: 3, title: "E-Commerce", icon: "insurance" },
];
