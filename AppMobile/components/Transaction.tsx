import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTheme } from "@ui-kitten/components";

import Text from "components/Text";
import CurrencyText from "components/CurrencyText";
import AnimatedAppearance from "./AnimatedAppearance";

import dayjs from "utils/dayjs";
import { Category_Types_Enum, TransactionFragment } from "constants/Type";

interface TransactionProps {
  item: TransactionFragment;
  onPress?(): void;
  index?: number;
}

const Transaction = ({ item, index, onPress }: TransactionProps) => {
  const theme = useTheme();
  const { category, name, note, amount, transaction_at, type_id } = item;

  return (
    <AnimatedAppearance index={index}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.container,
          { backgroundColor: theme["background-basic-color-2"] },
        ]}
        onPress={onPress}
      >
        <View
          style={[
            styles.iconView,
            { backgroundColor: theme["color-basic-1300"] },
          ]}
        >
          {!!category?.icon?.path && (
            <Image
              source={category?.icon?.path}
              style={[styles.icon, { tintColor: theme["color-basic-100"] }]}
            />
          )}
        </View>
        <View style={styles.content}>
          <Text category="headline" status="white" numberOfLines={1}>
            {note ? note : name}
          </Text>
          <Text category="footnote" status="placeholder" marginTop={4}>
            {dayjs(transaction_at).format("DD MMMM YYYY")}
          </Text>
        </View>
        <CurrencyText
          category="headline"
          status={type_id === Category_Types_Enum.Income ? "success" : "danger"}
          type={type_id}
        >
          {amount}
        </CurrencyText>
      </TouchableOpacity>
    </AnimatedAppearance>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
    paddingVertical: 12,
    paddingLeft: 10,
    paddingRight: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconView: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginRight: 24,
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
