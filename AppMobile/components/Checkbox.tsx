import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

interface Props {
  checked?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Checkbox = ({ checked, style }: Props) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View
      style={[
        styles.container,
        { borderWidth: checked ? 0 : 2 },
        {
          backgroundColor: checked ? theme["color-primary-100"] : "transparent",
        },
      ]}
    >
      {checked ? (
        <Icon pack="assets" name="radioCheck" style={styles.icon} />
      ) : null}
    </View>
  );
};

export default Checkbox;

const themedStyles = StyleService.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 99,
    borderColor: "color-basic-2400",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 12,
    height: 8.26,
  },
});
