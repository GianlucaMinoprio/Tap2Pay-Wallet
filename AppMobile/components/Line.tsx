import React, { memo } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  StyleProp,
  ViewStyle,
  ColorValue,
} from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
interface Props {
  style?: StyleProp<ViewStyle>;
  level?: string;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  backgroundColor?: ColorValue | string;
}
const Line = ({
  style,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  marginVertical,
  marginHorizontal,
  level = "2",
  backgroundColor,
}: Props) => {
  return (
    <View
      style={[
        style,
        {
          flex: 1,
          marginLeft: marginLeft,
          marginRight: marginRight,
          marginTop: marginTop,
          marginBottom: marginBottom,
          marginVertical: marginVertical,
          marginHorizontal: marginHorizontal,
        },
      ]}
    >
      <Layout
        level={level}
        style={[
          styles.layout,
          {
            backgroundColor: backgroundColor,
          },
        ]}
      ></Layout>
    </View>
  );
};

export default Line;

const styles = StyleSheet.create({
  layout: {
    height: 1,
  },
});
