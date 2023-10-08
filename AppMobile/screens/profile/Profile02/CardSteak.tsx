import React from "react";
import { View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";

import Text from "components/Text";

import Line from "components/Line";

const CardSteak = () => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout style={styles.container} level="2">
      <View style={[styles.flexRow, { marginVertical: 24 }]}>
        <Text children="Steaks" category="title4" status="white" />
        <Icon
          pack="assets"
          name="question"
          style={{
            tintColor: theme["text-snow-color"],
            width: 16,
            height: 16,
          }}
        />
      </View>
      <Line
        style={{
          backgroundColor: theme["color-basic-1300"],
          height: 2,
        }}
      />
      <View style={[styles.flexRow]}>
        <View style={styles.btm}>
          <Text center children="1 day" category="title4" status="white" />
          <Text
            children="Current Steak"
            marginTop={4}
            category="subhead"
            status="snow"
          />
        </View>
        <Layout
          style={{ width: 2, backgroundColor: theme["color-basic-1300"] }}
        />
        <View style={styles.btm}>
          <Text center children="1 day" category="title4" status="white" />
          <Text
            children="Current Steak"
            marginTop={4}
            category="subhead"
            status="snow"
          />
        </View>
      </View>
    </Layout>
  );
};

export default CardSteak;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
  },
  btm: {
    marginVertical: 16,
    marginHorizontal: 24,
  },
});
