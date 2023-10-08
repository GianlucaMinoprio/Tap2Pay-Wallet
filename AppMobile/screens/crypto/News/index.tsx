import React, { memo } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Icon,
  ViewPager,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import keyExtractor from "utils/keyExtractor";
import CryptoTabBar from "../Component/CryptoTabBar";
import BottomTab from "../Component/BottomTab";
import { LinearGradient } from "expo-linear-gradient";
import NewItem from "./NewItem";
import Trending from "./Trending";

const News = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [activeTab, setActiveTab] = React.useState(0);
  const ListHeader = React.useCallback(() => {
    return <></>;
  }, []);

  const renderItem = React.useCallback(() => {
    return (
      <>
        <CryptoTabBar
          tabs={["Trending", "Recent", "Popular"]}
          selectedIndex={activeTab}
          onChange={setActiveTab}
          style={styles.tabBar}
        />
      </>
    );
  }, [activeTab, setActiveTab]);
  const ListFooterComponent = React.useCallback(() => {
    return (
      <>
        <ViewPager
          selectedIndex={activeTab}
          onSelect={setActiveTab}
          swipeEnabled={false}
          shouldLoadComponent={(i) => i === activeTab}
        >
          <Trending data={DATA}/>
          <Trending data={DATA} />
          <Trending data={DATA} />
        </ViewPager>

      </>
    );
  }, [activeTab]);
  return (
    <Container style={styles.container} useSafeArea={false}>
      <Layout level={"2"} style={[styles.header, { paddingTop: top }]}>
        <TopNavigation
          appearance={"control"}
          accessoryLeft={() => (
            <TouchableOpacity onPress={goBack}>
              <Avatar source={Images.avatar9} size={"32"} />
            </TouchableOpacity>
          )}
          accessoryRight={<Text status={"primary"}>December 2021</Text>}
        />
        <Text category="title2" marginBottom={8}>
          New and Blog
        </Text>
      </Layout>
      <FlatList
        data={[1]}
        renderItem={renderItem}
        stickyHeaderIndices={[1]}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ListFooterComponent}
      />

      <BottomTab />
    </Container>
  );
});

export default News;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 16,
  },
  content: {},
  tabBar: {
    marginTop: 24,
    marginBottom: 16,
    marginHorizontal: 24,
  },
});
const DATA = [
  {
    id: 0,
    title: "The raised part of the edge on both sides of a coin.",
    date: "3 days ago",
    coin: "Ethereum",
    icon: "eth",
    image: Images.collection,
  },
  {
    id: 1,
    title: "The raised part of the edge on both sides of a coin.",
    date: "3 days ago",
    coin: "Bitcoin",
    icon: "bitcoin",
    image: Images.collection1,
  },
  {
    id: 2,
    title: "The raised part of the edge on both sides of a coin.",
    date: "3 days ago",
    coin: "Ripple",
    icon: "xrp",
    image: Images.collection2,
  },
  {
    id: 3,
    title: "The raised part of the edge on both sides of a coin.",
    date: "3 days ago",
    coin: "Littecoin",
    icon: "littecoin",
    image: Images.collection3,
  },
];
