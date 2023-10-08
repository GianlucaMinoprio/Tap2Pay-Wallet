import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@ui-kitten/components";

import Text from "components/Text";
import CurrencyText from "components/CurrencyText";

import { AssetFragment, Category_Types_Enum } from "constants/Type";

interface AssetProps {
  item: AssetFragment;
  onPress?(): void;
}

const Asset = ({ item, onPress }: AssetProps) => {
  const theme = useTheme();
  const { percent, description, name, amount, point, type_id } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        { borderBottomColor: theme["background-basic-color-2"] },
      ]}
    >
      <View style={styles.flex}>
        <Text category="title4" uppercase>
          {name}
        </Text>
      </View>
      <View style={styles.flexRow}>
        <View>
          <CurrencyText>{amount}</CurrencyText>
          <Text
            style={{
              color:
                type_id === Category_Types_Enum.Income
                  ? theme["color-salmon-600"]
                  : theme["color-corn-100"],
            }}
            marginTop={10}
          >
            {type_id === Category_Types_Enum.Income ? "+" : "-"}
            {percent}%
          </Text>
        </View>
        <View>
          <Text status="success" right>
            {description}%
          </Text>
          <Text marginTop={10} right>
            {point}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Asset;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flex: {
    flex: 1,
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
