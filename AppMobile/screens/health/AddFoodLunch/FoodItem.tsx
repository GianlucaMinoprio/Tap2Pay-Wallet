import React from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";
import Text from "components/Text";

interface Props {
  cals: number;
  title: string;
  quantity: number;
}

const FoodItem = ({ cals, quantity, title }: Props) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.bodyCard}>
      <View style={styles.leftCard}>
        <View style={styles.icon}>
          <Icon pack="assets" name="happyFace" style={styles.happyFace} />
        </View>
        <View>
          <Text category="headline" status="white">
            {title}
          </Text>
          <Text category="footnote" status="placeholder">
            {`${cals} CALS`}
          </Text>
        </View>
      </View>
      <Text>{`x${quantity}`}</Text>
    </View>
  );
};

export default FoodItem;

const themedStyles = StyleService.create({
  bodyCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "color-basic-1500",
    flexDirection: "row",
    marginHorizontal: 24,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 16,
    marginBottom: 16,
  },
  leftCard: {
    flexDirection: "row",
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 99,
    backgroundColor: "#384450",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 16,
  },
  happyFace: {
    width: 24,
    height: 24,
    tintColor: "text-white-color",
  },
});
