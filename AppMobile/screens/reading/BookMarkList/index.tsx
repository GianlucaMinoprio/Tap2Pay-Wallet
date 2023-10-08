import React, { memo } from "react";
import { View, FlatList } from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import ItemBook from "./ItemBook";
import { Images } from "assets/images";
import { RefreshControl } from "react-native-web-refresh-control";

const BookMarkList = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const renderItem = React.useCallback(({ item }) => {
    return <ItemBook data={item} onPress={goBack} />;
  }, []);
  return (
    <Container style={styles.container}>
      <Layout level="2" style={styles.topNav}>
        <View style={[styles.nav, { paddingTop: top }]}>
          <NavigationAction icon="leftArrow" />
          <NavigationAction icon="search" />
        </View>
        <Text
          category="title2"
          status="white"
          marginLeft={16}
          marginBottom={8}
          children="Finance Personal"
        />
      </Layout>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyExtractor={(i, _) => i.id.toString()}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
        contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
        ListHeaderComponent={
          <Text category="title4" status="placeholder" marginBottom={16}>
            {DATA.length} Books
          </Text>
        }
      />
    </Container>
  );
});

export default BookMarkList;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 4,
  },
  topNav: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
});
const DATA = [
  {
    id: 0,
    title: "The world, your life",
    author: "June Cook",
    minutes: 48,
    book: Images.book5,
  },
  {
    id: 1,
    title: "The world, your life",
    author: "June Cook",
    minutes: 48,
    book: Images.book5,
  },
  {
    id: 2,
    title: "The world, your life",
    author: "June Cook",
    minutes: 48,
    book: Images.book5,
  },
  {
    id: 3,
    title: "The world, your life",
    author: "June Cook",
    minutes: 48,
    book: Images.book5,
  },
];
