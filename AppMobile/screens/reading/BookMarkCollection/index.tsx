import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Content from "components/Content";
import Container from "components/Container";
import ItemBookMark from "./ItemBookMark";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";
import { RefreshControl } from "react-native-web-refresh-control";

const BookMarkCollection = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title="Bookmark"
        accessoryRight={<NavigationAction icon="menu" />}
        accessoryLeft={<NavigationAction icon="leftArrow" />}
      />
      <Content
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
        contentContainerStyle={[{ paddingBottom: bottom + 24 }, styles.content]}
      >
        <ItemBookMark
          title="Finance Personal"
          list={[Images.book1, Images.book4, Images.book3, Images.book5]}
          onPress={goBack}
        />
        <ItemBookMark
          title="Finance Personal"
          list={[
            Images.book5,
            Images.book1,
            Images.book4,
            Images.book3,
            Images.book2,
            Images.book6,
            Images.book5,
            Images.book5,
          ]}
          onPress={goBack}
        />
        <ItemBookMark
          title="Finance Personal"
          list={[Images.book1, Images.book4, Images.book3, Images.book5]}
          onPress={goBack}
        />
      </Content>
    </Container>
  );
});

export default BookMarkCollection;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingTop: 16,
  },
});
