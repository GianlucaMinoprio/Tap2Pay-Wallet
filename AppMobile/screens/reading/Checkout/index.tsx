import React, { memo } from "react";
import { View, FlatList } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  IndexPath,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import BookDownload from "./BookDownload";

const Checkout = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = React.useState(DATA);
  const [selectIndex, setSelectIndex] = React.useState<IndexPath | IndexPath[]>(
    new IndexPath(0)
  );
  const dataSelect = ["Sort by", "Option 2", "Option 3"];
  /* @ts-ignore */
  const displayValue = dataSelect[selectIndex.row];
  const ListHeaderComponent = React.useCallback(() => {
    return (
      <View style={styles.headerComponent}>
        <Text category="title4" status="placeholder">
          {data.length} Books
        </Text>
        <Select
          size="medium"
          status="transparent"
          value={displayValue}
          style={{ width: width / 2 }}
          selectedIndex={selectIndex}
          onSelect={(index) => setSelectIndex(index)}
        >
          <SelectItem title="Sort by" />
          <SelectItem title="Option 2" />
          <SelectItem title="Option 3" />
        </Select>
      </View>
    );
  }, [displayValue, selectIndex]);
  const renderItem = React.useCallback(
    ({ item }) => {
      return (
        <BookDownload
          data={item}
          onPress={goBack}
          valueDownload={item.valueDownload}
          downloadDone={item.downloadDone}
        />
      );
    },
    [data]
  );
  return (
    <Container style={styles.container}>
      <Layout level="2" style={styles.topNav}>
        <View style={[styles.nav, { paddingTop: top }]}>
          <NavigationAction icon="leftArrow" />
          <NavigationAction icon="menu" />
        </View>
        <Text
          category="title2"
          status="white"
          marginLeft={16}
          marginBottom={8}
          children="Downloads"
        />
      </Layout>
      <FlatList
        data={data}
        keyExtractor={(i, _) => i.id.toString()}
        renderItem={renderItem}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
      />
    </Container>
  );
});

export default Checkout;

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
  content: {},
  headerComponent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 19,
    paddingRight: 16,
    marginTop: 16,
  },
});
const DATA = [
  {
    id: 0,
    book: Images.book5,
    title: "The wolrd, your life",
    author: "June Cook",
    des:
      "The author, vice chairman of Ogilvy, shares why what’s is The future of brands ",
    minutes: 48,
    valueDownload: 40,
  },
  {
    id: 1,
    book: Images.book5,
    title: "The wolrd, your life",
    author: "June Cook",
    des:
      "The author, vice chairman of Ogilvy, shares why what’s is The future of brands ",
    minutes: 48,
    downloadDone: true,
  },
  {
    id: 2,
    book: Images.book5,
    title: "The wolrd, your life",
    author: "June Cook",
    des:
      "The author, vice chairman of Ogilvy, shares why what’s is The future of brands ",
    minutes: 48,
    downloadDone: true,
  },
  {
    id: 3,
    book: Images.book5,
    title: "The wolrd, your life",
    author: "June Cook",
    des:
      "The author, vice chairman of Ogilvy, shares why what’s is The future of brands ",
    minutes: 48,
    downloadDone: true,
  },
];
