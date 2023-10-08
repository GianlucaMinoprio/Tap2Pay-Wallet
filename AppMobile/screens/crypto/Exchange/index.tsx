import React, { memo } from "react";
import { FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  ViewPager,
} from "@ui-kitten/components";

import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import keyExtractor from "utils/keyExtractor";
import ExchangeTab from "./ExchangeTab";
import BottomTab from "../Component/BottomTab";
import ExchangeScreen from "./ExchangeScreen";

const Exchange = memo(() => {
  const styles = useStyleSheet(themedStyles);

  const [selectIndex, setSelectIndex] = React.useState(0);

  const renderItem = React.useCallback(() => {
    return (
      <ExchangeTab
        style={styles.tabBar}
        activeIndex={selectIndex}
        onChange={setSelectIndex}
        tabs={[
          "BTC/USD",
          "BTC/USD",
          "BTC/USD",
          "BTC/USD",
          "BTC/USD",
          "BTC/USD",
        ]}
      />
    );
  }, [selectIndex]);
  const ListHeaderComponent = React.useCallback(() => {
    return <></>;
  }, []);
  const ListFooterComponent = React.useCallback(() => {
    return (
      <ViewPager
        selectedIndex={selectIndex}
        onSelect={setSelectIndex}
        shouldLoadComponent={(i) => selectIndex === i}
      >
        <ExchangeScreen title="BTC" icon="bitcoin" priceCoin={6456.45} />
        <ExchangeScreen title="ETH" icon="eth" priceCoin={6456.45} />
        <></>
        <></>
        <></>
      </ViewPager>
    );
  }, [selectIndex]);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.header}
        title={"Exchange"}
        accessoryLeft={<NavigationAction icon="undo" status="opacity" />}
        accessoryRight={<NavigationAction icon="settings" status="opacity" />}
      />
      <FlatList
        data={[1]}
        renderItem={renderItem}
        stickyHeaderIndices={[1]}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
      />
      <BottomTab selectIndex={3} />
    </Container>
  );
});

export default Exchange;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  header: {
    borderBottomColor: "color-basic-1500",
    borderBottomWidth: 1,
  },
  tabBar: {
    paddingLeft: 24,
    paddingTop: 24,
    marginBottom: 40,
  },
});
