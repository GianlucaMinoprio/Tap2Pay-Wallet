import React from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { LinearGradient } from "expo-linear-gradient";

interface InformationProps {
  rateStar: number;
  cal: number;
  deliveryTime: string;
}
const Information = ({ rateStar, cal, deliveryTime }: InformationProps) => {
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <View
      style={
        (styles.container,
        {
          width: 164 * (width / 375),
        })
      }
    >
      <LinearGradient
        style={styles.linear}
        colors={[
          "rgba(255, 255, 255, 0.3)",
          "rgba(255, 255, 255, 0.2)",
          "rgba(255, 255, 255, 0.2)",
          "rgba(255, 255, 255, 0.1)",
          "rgba(255, 255, 255, 0)",
        ]}
      >
        <Text status={"primary"} category="title4">
          Information
        </Text>
      </LinearGradient>
      <View style={{ alignItems: "flex-end", marginTop: 8 }}>
        <View>
          <Text category="headline">⏰️ {deliveryTime}</Text>
          <Text category="headline" marginVertical={8}>
            🔥 {cal}
          </Text>
          <Text category="headline">⭐️ {rateStar}/5</Text>
        </View>
      </View>
    </View>
  );
};

export default Information;

const themedStyles = StyleService.create({
  container: {
    borderTopRightRadius: 124,
    paddingLeft: 24,
    borderBottomRightRadius: 142,
  },
  linear: {
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "background-basic-color-7",
    marginLeft: -12,
  },
});
