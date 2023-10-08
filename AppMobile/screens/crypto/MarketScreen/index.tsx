import React, { memo } from "react";
import { FlatList } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import BasicHeader from "screens/education/Component/BasicHeader";
import CryptoTabBar from "../Component/CryptoTabBar";
import BottomTab from "../Component/BottomTab";
import keyExtractor from "utils/keyExtractor";
import { Crypto_Types_Enum } from "constants/Type";
import AnimatedAppearance from "components/AnimatedAppearance";
import MarketItem from "../Component/MarketItem";

const MarketScreen = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeTab, setActiveTab] = React.useState(0);

  const renderItem = React.useCallback(() => {
    return (
      <CryptoTabBar
        tabs={["All new", "Watchlists", "Trending"]}
        selectedIndex={activeTab}
        onChange={setActiveTab}
        style={styles.tabBar}
      />
    );
  }, [activeTab, setActiveTab]);

  const ListFooterComponent = React.useCallback(() => {
    return (
      <ViewPager
        onSelect={setActiveTab}
        selectedIndex={activeTab}
        shouldLoadComponent={(i) => i === activeTab}
        style={styles.viewPager}
      >
        <AnimatedAppearance>
          <>
            {DATA_ALL_NEW.map((item, i) => {
              return <MarketItem item={item} key={i} style={styles.item} />;
            })}
          </>
        </AnimatedAppearance>
        <AnimatedAppearance>
          <>
            {DATA_WATCH_LISTS.map((item, i) => {
              return <MarketItem item={item} key={i} style={styles.item} />;
            })}
          </>
        </AnimatedAppearance>
        <AnimatedAppearance>
          <>
            {DATA_WATCH_LISTS.map((item, i) => {
              return <MarketItem item={item} key={i} style={styles.item} />;
            })}
          </>
        </AnimatedAppearance>
      </ViewPager>
    );
  }, [activeTab, setActiveTab]);
  const ListHeader = React.useCallback(() => {
    return (
      <Layout level={"2"} style={[styles.header, { paddingTop: top }]}>
        <BasicHeader
          appearance={"control"}
          iconLeft={{ icon: "leftArrow" }}
          iconRight={{ icon: "user" }}
        />
        <Text category="title2" marginBottom={8} marginLeft={16}>
          Market
        </Text>
      </Layout>
    );
  }, []);
  return (
    <Container style={styles.container} useSafeArea={false}>
      <ListHeader />
      <FlatList
        data={[1]}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<></>}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ListFooterComponent}
      />
      <BottomTab />
    </Container>
  );
});

export default MarketScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  tabBar: {
    marginTop: 24,
    marginHorizontal: 24,
  },
  item: {
    borderBottomWidth: 1,
    marginBottom: 16,
    marginHorizontal: 24,
    borderBottomColor: "background-basic-color-2",
  },
  viewPager: {
    marginTop: 24,
  },
  content: {
    marginBottom: 40,
    paddingTop: 0,
  },
});
const DATA_ALL_NEW = [
  {
    id: 1,
    title: "Bitcoin",
    icon: "bitcoin",
    coin: 0.03223,
    percent: "+2.39%",
    status: Crypto_Types_Enum.Grow,
    price: "$6,456.45",
    exchange: 13.36,
  },
  {
    id: 0,
    title: "ETHEREUM",
    icon: "eth",
    coin: 0.0007247,
    percent: "+11.39%",
    status: Crypto_Types_Enum.Grow,
    price: "$8,682.45",
    exchange: 24.36,
  },
  {
    id: 2,
    title: "Ripple",
    icon: "xrp",
    coin: 0.7247,
    percent: "-1.9%",
    status: Crypto_Types_Enum.Down,
    price: "$3,282.45",
    exchange: 34.36,
  },
  {
    id: 3,
    title: "Tether",
    icon: "tether",
    coin: 0.247,
    percent: "+1.9%",
    status: Crypto_Types_Enum.Grow,
    price: "$1,682.45",
    exchange: 4.36,
  },
  {
    id: 4,
    title: "Littecoin",
    icon: "littecoin",
    coin: 32.247,
    percent: "+2.932%",
    status: Crypto_Types_Enum.Grow,
    price: "$682.45",
    exchange: 14.36,
  },
  {
    id: 5,
    title: "Achain",
    icon: "achain",
    coin: 123.247,
    percent: "-2.932%",
    status: Crypto_Types_Enum.Down,
    price: "$1,682.45",
    exchange: 14.36,
  },
  {
    id: 6,
    title: "Gala",
    icon: "xrp",
    coin: 123.247,
    percent: "-2.932%",
    status: Crypto_Types_Enum.Down,
    price: "$1,682.45",
    exchange: 14.36,
  },
];
const DATA_WATCH_LISTS = [
  {
    id: 1,
    title: "Bitcoin",
    icon: "bitcoin",
    coin: 0.03223,
    percent: "+2.39%",
    status: Crypto_Types_Enum.Grow,
    price: "$6,456.45",
    exchange: 13.36,
  },
  {
    id: 0,
    title: "ETHEREUM",
    icon: "eth",
    coin: 0.0007247,
    percent: "+11.39%",
    status: Crypto_Types_Enum.Grow,
    price: "$8,682.45",
    exchange: 24.36,
  },
  {
    id: 2,
    title: "Ripple",
    icon: "xrp",
    coin: 0.7247,
    percent: "-1.9%",
    status: Crypto_Types_Enum.Down,
    price: "$3,282.45",
    exchange: 34.36,
  },
  {
    id: 3,
    title: "Tether",
    icon: "tether",
    coin: 0.247,
    percent: "+1.9%",
    status: Crypto_Types_Enum.Grow,
    price: "$1,682.45",
    exchange: 4.36,
  },
  {
    id: 4,
    title: "Littecoin",
    icon: "littecoin",
    coin: 0.247,
    percent: "-2.932%",
    status: Crypto_Types_Enum.Down,
    price: "$682.45",
    exchange: 14.36,
  },
];
