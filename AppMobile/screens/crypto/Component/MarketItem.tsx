import React, { memo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";
import { Crypto_Types_Enum } from "constants/Type";

interface Props {
  id: number;
  title: string;
  icon: string;
  coin: number;
  percent: string;
  status: Crypto_Types_Enum;
  price: string;
  exchange: number;
}
interface ItemProps {
  item: Props;
  style?: StyleProp<ViewStyle>;
}

const MarketItem = memo(({ item, style }: ItemProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[styles.item, style]}>
      <View style={styles.state}>
        <Layout style={styles.iconLogo} level={"2"}>
          <Icon pack="assets" name={item.icon} style={{}} />
        </Layout>
        <View>
          <Text category="headline">{item.title}</Text>
          <Text category="caption1" uppercase status={"placeholder"}>
            {item.coin}
          </Text>
        </View>
      </View>
      <View style={styles.rightItem}>
        <Text category="headline">{item.price}</Text>
        <Text
          status={item.status === "grow" ? "green" : "red"}
          category="caption1"
        >
          {item.percent}
          <Text
            status={item.status === "grow" ? "green" : "red"}
            category="caption1"
          >
            ({item.status === "grow" ? "+$" : "-$"}
            {item.exchange})
          </Text>
        </Text>
      </View>
    </View>
  );
});

export default MarketItem;

const themedStyles = StyleService.create({
  iconLogo: {
    width: 40,
    height: 40,
    marginBottom: 16,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  state: {
    flexDirection: "row",
  },
  rightItem: {
    alignItems: "flex-end",
  },
});
