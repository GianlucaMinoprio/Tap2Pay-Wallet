import React, { memo } from "react";
import { FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import Book from "./Book";
import { RefreshControl } from "react-native-web-refresh-control";

const ListBook = memo(() => {
  const { top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const _renderItem = React.useCallback(
    ({ item, index }) => {
      return <Book data={item} />;
    },
    [DATA]
  );
  return (
    <Container style={styles.container}>
      <Layout level="2" style={[{ paddingTop: top }, styles.header]}>
        <TopNavigation
          appearance="control"
          accessoryRight={<NavigationAction icon="search" />}
          accessoryLeft={<NavigationAction icon="leftArrow" />}
        />
        <Text category="title2" status="white" marginLeft={16} marginBottom={8}>
          List Book
        </Text>
      </Layout>
      <FlatList
        data={DATA}
        contentContainerStyle={{
          paddingBottom: bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        horizontal={false}
        numColumns={2}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
        renderItem={_renderItem}
        keyExtractor={(i, index) => index.toString()}
      />
    </Container>
  );
});

export default ListBook;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    paddingTop: 0,
  },
  header: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  timeView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
const DATA = [
  {
    id: 0,
    title: "Book name",
    time: 24,
    isBookMark: false,
    image: Images.book1,
  },
  {
    id: 1,
    title: "Book name",
    time: 24,
    isBookMark: false,
    image: Images.book2,
  },
  {
    id: 2,
    title: "Book name",
    time: 24,
    isBookMark: false,
    image: Images.book3,
  },
  {
    id: 3,
    title: "Book name",
    time: 24,
    isBookMark: false,
    image: Images.book4,
  },
  {
    id: 4,
    title: "Book name",
    time: 24,
    isBookMark: false,
    image: Images.book5,
  },
  {
    id: 5,
    title: "Book name",
    time: 24,
    isBookMark: false,
    image: Images.book6,
  },
];
