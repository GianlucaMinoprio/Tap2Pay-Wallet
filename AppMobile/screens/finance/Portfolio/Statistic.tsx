import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import CurrencyText from "components/CurrencyText";

import {
  Format_Types_Enum,
  StatisticFragment,
  Category_Types_Enum,
} from "constants/Type";

interface StatisticProps {
  item: StatisticFragment;
  onPress?(): void;
}

const Statistic = ({ item, onPress }: StatisticProps) => {
  const theme = useTheme();
  const { width } = useLayout();

  const { name, percent, amount, type_id } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          width: (width - 52) / 3,
          backgroundColor: theme["background-basic-color-2"],
        },
      ]}
    >
      <Text category="caption1">{name}</Text>
      <View style={styles.row}>
        <Text category="headline" marginRight={2}>
          {type_id === Category_Types_Enum.Income ? "+" : "-"}
          {percent}%
        </Text>
        <CurrencyText
          category="caption2"
          status="snow"
          marginBottom={3}
          type={type_id}
          formatType={Format_Types_Enum.Inky}
        >
          {amount}%
        </CurrencyText>
      </View>
    </TouchableOpacity>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 4,
  },
});
