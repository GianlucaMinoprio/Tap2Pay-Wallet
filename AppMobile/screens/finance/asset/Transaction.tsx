import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme, Icon } from "@ui-kitten/components";

import Text from "components/Text";
import CurrencyText from "./CurrencyText";
import AnimatedAppearance from "components/AnimatedAppearance";

import {
  Animation_Types_Enum,
  Format_Types_Enum,
  TransactionFragment,
} from "constants/Type";

interface TransactionProps {
  item: TransactionFragment;
  onPress?(): void;
  index: number;
}

const Transaction = ({ item, index, onPress }: TransactionProps) => {
  const theme = useTheme();

  const { name, amount, type_id } = item;

  return (
    <AnimatedAppearance type={Animation_Types_Enum.SlideInRight} index={index}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[
          styles.container,
          { backgroundColor: theme["background-basic-color-2"] },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.walletIcon}>
            <Icon pack="assets" name="creditCard" />
          </View>
          <View>
            <Text category="headline">{name}</Text>
            <CurrencyText
              category="footnote"
              children={amount}
              marginTop={4}
              type={type_id}
              formatType={Format_Types_Enum.Inky}
            />
          </View>
        </View>
        <Icon
          pack="assets"
          name="arrowRight16"
          style={[styles.icon, { tintColor: theme["icon-basic-color"] }]}
        />
      </TouchableOpacity>
    </AnimatedAppearance>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 21,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletIcon: {
    width: 48,
    height: 48,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    width: 16,
    height: 16,
  },
});
