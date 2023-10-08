import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTheme } from "@ui-kitten/components";

import Text from "components/Text";
import CurrencyText from "components/CurrencyText";

import dayjs from "utils/dayjs";
import { Format_Types_Enum, TransactionFragment } from "constants/Type";

interface TransactionProps {
  item: TransactionFragment;
  onPress?(): void;
}

const Transaction = ({ item, onPress }: TransactionProps) => {
  const theme = useTheme();
  const { category, name, note, amount, transaction_at, type_id } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconView,
          { backgroundColor: theme["color-basic-1300"] },
        ]}
      >
        {!!category?.icon?.path && (
          <Image source={category?.icon?.path} style={styles.icon} />
        )}
      </View>
      <View style={styles.content}>
        <Text category="headline" status="white" numberOfLines={1}>
          {note ? note : name}
        </Text>
        <Text category="footnote" status="placeholder" marginTop={12}>
          {dayjs(transaction_at).format("MM/DD/YYYY h:mm")}
        </Text>
      </View>
      <CurrencyText
        category="headline"
        status="white"
        type={type_id}
        formatType={Format_Types_Enum.Inky}
      >
        {amount}
      </CurrencyText>
    </TouchableOpacity>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingLeft: 10,
    paddingRight: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
  },
  iconView: {
    width: 56,
    height: 56,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginRight: 24,
    justifyContent: "center",
  },
  icon: {
    width: 32,
    height: 32,
  },
});
