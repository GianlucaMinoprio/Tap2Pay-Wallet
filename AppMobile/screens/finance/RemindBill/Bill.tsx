import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import CurrencyText from "components/CurrencyText";

import dayjs from "utils/dayjs";
import { BillFragment } from "constants/Type";

interface BillProps {
  item: BillFragment;
  onPress?(): void;
}

const Bill = ({ item, onPress }: BillProps) => {
  const { width } = useLayout();
  const { amount, date, category } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        { width: width - 68, backgroundColor: category?.color },
      ]}
      onPress={onPress}
    >
      <View style={styles.top}>
        <View style={styles.row}>
          {!!category?.icon?.path && (
            <Image source={category?.icon?.path} style={styles.icon} />
          )}
          <View>
            <Text category="title4" status="black">
              {category?.name}
            </Text>
            <CurrencyText category="title3" status="title" marginTop={8}>
              {amount}
            </CurrencyText>
          </View>
        </View>
        <Text category="body" style={{ color: "#215191" }}>
          {dayjs(date).format("DD MMM")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Bill;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginRight: 16,
    paddingLeft: 24,
    paddingTop: 24,
    paddingBottom: 16,
    paddingRight: 16,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
});
