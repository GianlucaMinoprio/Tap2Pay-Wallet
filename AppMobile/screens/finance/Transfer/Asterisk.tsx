import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "@ui-kitten/components";

import Text from "components/Text";

interface Props {
  number: number;
  style?: ViewStyle;
}

const Asterisk = ({ number, style }: Props) => {
  const theme = useTheme();

  const renderItem = React.useCallback(() => {
    const dots = [];
    const dotN = number || 0;

    for (let i = 0; i < dotN; i++) {
      dots.push(
        <Text
          key={i}
          category="title3"
          status="snow"
          marginTop={4}
          marginRight={i < dotN - 1 ? 4 : 0}
          style={{ fontSize: 20, color: theme["color-basic-1100"] }}
        >
          *
        </Text>
      );
    }
    return dots;
  }, [number]);

  return <View style={[styles.container, style]}>{renderItem()}</View>;
};

export default Asterisk;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
