import React, { memo } from "react";
import { View, Image, ScrollView } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import Header from "./Header";
import BestSeller from "./BestSeller";
import Gallery from "./Gallery";
import { Images } from "assets/images";
import { RefreshControl } from "react-native-web-refresh-control";

const ECommerceHome = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={<NavigationAction icon="search" />}
        accessoryRight={
          <View style={styles.rightNav}>
            <NavigationAction icon="heart" marginRight={-8} />
            <NavigationAction icon="shopping" />
          </View>
        }
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      >
        <Header />
        <BestSeller />
        <Gallery />
      </ScrollView>
      <Layout
        level="2"
        style={[styles.bottomTab, { paddingBottom: bottom  }]}
      >
        <NavigationAction icon="calendar" status="snow" size="medium" />
        <NavigationAction icon="beachHouse" status="snow" size="medium" />
        <Image
          source={Images.logo4}
          /* @ts-ignore */
          style={styles.logo}
        />
        <NavigationAction icon="fire" status="snow" size="medium" />
        <NavigationAction icon="user" status="primary" size="medium" />
      </Layout>
    </Container>
  );
});

export default ECommerceHome;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  bottomTab: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 12,
    alignItems: "center",
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    width: 24,
    height: 20.71,
  },
  content: {
    paddingBottom: 100,
  },
  topNav: {
    paddingHorizontal: 4,
  },

  rightNav: {
    flexDirection: "row",
  },
});
