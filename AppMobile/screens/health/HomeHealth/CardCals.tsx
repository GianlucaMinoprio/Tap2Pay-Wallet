import React from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";
import ProgressBar from "components/ProgressBar";

interface Props {
  title: string;
  cals: number;
  totalCals: number;
  style?: StyleProp<ViewStyle>;
}

const CardCals = ({ title, cals, totalCals, style }: Props) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout style={[styles.container, style]} level="5">
      <Text
        status="white"
        category="title4"
        children={title}
        marginBottom={17}
      />
      <ProgressBar
        didDone={cals}
        total={totalCals}
        styleBar={styles.bar}
        style={styles.containerBar}
      />
      <View style={styles.calsView}>
        <Text category="headline">{cals}</Text>
        <Text category="headline" opacity={0.5}>
          {totalCals}
        </Text>
      </View>
      <TouchableOpacity style={styles.btnShowMore}>
        <Icon pack="assets" name="downArr" style={styles.icon} opacity={0.5} />
      </TouchableOpacity>
    </Layout>
  );
};

export default CardCals;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 8,
    paddingTop: 16,
    paddingHorizontal: 16,
    marginHorizontal: 24,
  },
  calsView: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  containerBar: {
    backgroundColor: "#5DA5B6",
  },
  bar: {
    backgroundColor: "color-basic-100",
  },
  btnShowMore: {
    alignItems: "center",
  },
  icon: {
    tintColor: "text-white-color",
    marginBottom: 12,
  },
});
