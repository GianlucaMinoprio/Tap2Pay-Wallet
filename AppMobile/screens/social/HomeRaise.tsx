import React, { memo } from "react";
import {  FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import ExploreItem from "components/ExploreItem";

const HomeRaise = memo(() => {
  const { top, bottom } = useSafeAreaInsets();
  const styles = useStyleSheet(themedStyles);
  const renderItem = React.useCallback(({ item }) => {
    return <ExploreItem item={item} />;
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={[styles.topNavigation, { paddingTop: top }]}
        accessoryRight={<NavigationAction icon="happyFace" marginRight={4} />}
        accessoryLeft={<NavigationAction marginLeft={4} icon='leftArrow'/>}
      />
      <Layout style={styles.title} level={"2"}>
        <Text children="Explore" category={"title2"} marginBottom={8} />
      </Layout>
      <FlatList
        style={{
          paddingTop: 16,
        }}
        data={DATA_Explore}
        renderItem={renderItem}
        keyExtractor={(i, _) => i.id.toString()}
      />
    </Container>
  );
});

export default HomeRaise;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  topNavigation: {
    backgroundColor: "background-basic-color-2",
  },
  title: {
    paddingLeft: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
const DATA_Explore = [
  {
    id: 0,
    currency: "Crypto",
    date: "24 days left",
    image: Images.rectangle1,
    didDonate: 24680,
    total: 35790,
    title:
      "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
  },
  {
    id: 1,
    currency: "Crypto",
    date: "24 days left",
    image: Images.rectangle2,
    didDonate: 24680,
    total: 35790,
    title:
      "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
  },
  {
    id: 2,
    currency: "Crypto",
    date: "24 days left",
    image: Images.rectangle3,
    didDonate: 24680,
    total: 35790,
    title:
      "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
  },
  {
    id: 3,
    currency: "Crypto",
    date: "24 days left",
    image: Images.rectangle1,
    didDonate: 24680,
    total: 35790,
    title:
      "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
  },
];
