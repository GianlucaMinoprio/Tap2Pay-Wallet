import React, { memo } from "react";
import { FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Avatar,
  ViewPager,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Container from "components/Container";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";
import TabBar from "./TabBar";
import TabHomeBook from "./TabHomeBook";
import { RefreshControl } from "react-native-web-refresh-control";

const HomeBook = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = React.useState(DATA_TAB1);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const tabs = ["Trending", "Free Today", "Technology", "Technology"];
  const renderItem = React.useCallback(() => {
    return (
      <TabBar
        tabs={tabs}
        onChange={setActiveIndex}
        activeIndex={activeIndex}
        style={styles.tabBar}
        styleBtn={styles.btnTab}
      />
    );
  }, [activeIndex, setActiveIndex]);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryRight={<Avatar source={Images.avatar1} size={"32"} />}
        accessoryLeft={<NavigationAction icon="search" />}
      />
      <FlatList
        data={[1]}
        stickyHeaderIndices={[1]}
        keyExtractor={(i, _) => _.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: bottom + 24 }}
        scrollEventThrottle={16}
        ListHeaderComponent={() => null}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
        ListFooterComponent={() => {
          return (
            <ViewPager
              shouldLoadComponent={(index) => index === activeIndex}
              selectedIndex={activeIndex}
              onSelect={setActiveIndex}
            >
              <TabHomeBook index={activeIndex} data={data} />
              <TabHomeBook index={activeIndex} data={data} />
              <TabHomeBook index={activeIndex} data={data} />
              <TabHomeBook index={activeIndex} data={data} />
            </ViewPager>
          );
        }}
      />
    </Container>
  );
});

export default HomeBook;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNav: {
    marginLeft: 4,
    marginRight: 24,
    marginTop: 8,
  },
  tabBar: {
    paddingLeft: 16,
    backgroundColor: "background-basic-color-1",
    marginBottom: 16,
  },
  btnTab: {
    marginBottom: 8,
  },
});
const DATA_TAB1 = [
  {
    id: 0,
    title: "The wolrd, your life",
    author: "June Cook",
    time: 24,
    isBookMark: false,
    image: Images.saly45,
  },
  {
    id: 1,
    title: "Book name",
    author: "June Cook",
    time: 24,
    isBookMark: false,
    image: Images.book2,
  },
  {
    id: 2,
    title: "Book name",
    author: "June Cook",
    time: 24,
    isBookMark: false,
    image: Images.book3,
  },
  {
    id: 3,
    author: "June Cook",
    title: "Book name",
    time: 24,
    isBookMark: false,
    image: Images.book4,
  },
  {
    id: 4,
    author: "June Cook",
    title: "Book name",
    time: 24,
    isBookMark: false,
    image: Images.book5,
  },
  {
    id: 5,
    author: "June Cook",
    title: "Book name",
    time: 24,
    isBookMark: false,
    image: Images.book6,
  },
];
