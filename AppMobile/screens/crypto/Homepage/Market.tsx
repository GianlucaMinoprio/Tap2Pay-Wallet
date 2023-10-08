import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";

import Text from "components/Text";
import { Crypto_Types_Enum } from "constants/Type";
import MarketItem from "../Component/MarketItem";

const Market = memo(() => {
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text category="title2">Market</Text>
        <View style={styles.hour}>
          <Text status={"primary"} category="subhead" marginRight={4}>
            24 hours
          </Text>
          <Icon pack="assets" name="arrow" style={styles.arrow} />
        </View>
      </View>
      {DATA.map((item, i) => {
        return <MarketItem item={item} key={i} style={styles.item} />;
      })}
    </View>
  );
});

export default Market;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 16,
  },
  hour: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    width: 12,
    height: 12,
  },
  item: {
    marginHorizontal: 24,
  },
});
const DATA = [
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
