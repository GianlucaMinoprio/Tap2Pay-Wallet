import React, { memo } from "react";
import { View, FlatList } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
} from "@ui-kitten/components";

import useLayout from "hooks/useLayout";
import Text from "components/Text";
import BasicHeader from "screens/education/Component/BasicHeader";
import Container from "components/Container";
import CryptoTabBar from "../Component/CryptoTabBar";
import keyExtractor from "utils/keyExtractor";
import ChartCoin from "./ChartCoin";
import { LinearGradient } from "expo-linear-gradient";
import BottomTab from "../Component/BottomTab";

const CoinDetails = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeTab, setActiveTab] = React.useState(0);
  const renderItem = React.useCallback(() => {
    return (
      <CryptoTabBar
        tabs={["Buy", "Sell"]}
        selectedIndex={activeTab}
        onChange={setActiveTab}
        style={styles.tabBar}
      />
    );
  }, [activeTab, setActiveTab]);

  const ListFooterComponent = React.useCallback(() => {
    return (
      <ViewPager
        selectedIndex={activeTab}
        onSelect={setActiveTab}
        shouldLoadComponent={(i) => activeTab === i}
      >
        <View>
          <ChartCoin title="Bitcoin" />
          <View style={styles.information}>
            <LinearGradient
              style={{
                width: width,
                padding: 24,
                borderRadius: 24,
              }}
              colors={["rgba(81, 145, 240, 0.7)", "rgba(19, 51, 116, 1)"]}
            >
              <Text category="title3" marginBottom={16}>
                Information
              </Text>
              <View style={styles.contentCoin}>
                {DATA_COIN.map((item, i) => {
                  return (
                    <View
                      key={i}
                      style={{
                        width: width / 3,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 13,
                      }}
                    >
                      <Text category="headline" status={"snow"}>
                        {item.title}
                      </Text>
                      <Text category="headline">{item.price}</Text>
                    </View>
                  );
                })}
              </View>
            </LinearGradient>
          </View>
        </View>
        <Layout></Layout>
      </ViewPager>
    );
  }, [activeTab]);

  return (
    <Container style={styles.container} useSafeArea={false}>
      <Layout level={"2"} style={[styles.header, { paddingTop: top }]}>
        <BasicHeader
          appearance={"control"}
          iconLeft={{ icon: "leftArrow" }}
          iconRight={{ icon: "user" }}
        />
        <Text
          category="title2"
          marginBottom={8}
          marginLeft={16}
          fontFamily="Overpass-Regular"
        >
          Coin Details
        </Text>
      </Layout>

      <FlatList
        data={[1]}
        stickyHeaderIndices={[1]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<></>}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      />
      <BottomTab />
    </Container>
  );
});

export default CoinDetails;

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
  information: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  contentCoin: {
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
export const sampleData = [
  0, 1.5, 1.8, 1.6, 3.5, 4.5, 6.1, 3.5, 5.3, 2.4, 5, 8.7, 8.0, 6.5, 10, 9.3, 0,
  1.5, 1.8, 1.6, 3.5, 4.5, 6.1, 3.5, 53, 2.4, 5, 8.7, 8.0, 6.5, 10, 9.3, 1.5,
  1.8, 1.6, 3.5, 4.5, 6.1, 3.5, 5.3, 2.4, 5, 8.7, 8.0, 6.5, 10, 9.3, 40,
];
const DATA_COIN = [
  { title: "Open", price: 21233 },
  { title: "Close", price: 32233 },
  { title: "High", price: 41203 },
  { title: "Low", price: 19133 },
];
