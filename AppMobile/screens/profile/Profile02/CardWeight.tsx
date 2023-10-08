import React, { memo } from "react";
import { View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";

import Text from "components/Text";
import ProgressBar from "components/ProgressBar";

const CardWeight = () => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout
      level="4"
      style={{
        borderRadius: 12,
        marginHorizontal: 24,
        padding: 24,
      }}
    >
      <View style={styles.flexRow}>
        <Text children="Goal Weight: 60Kg" category="title4" />
        <Icon
          pack="assets"
          name="edit"
          style={{
            tintColor: theme["text-snow-color"],
            width: 16,
            height: 16,
          }}
        />
      </View>
      <Text
        children="You’ve gained 3Kg"
        marginTop={8}
        category="subhead"
        status="snow"
        marginBottom={32}
      />
      <ProgressBar
        didDone={3}
        total={10}
        styleBar={styles.progressBar}
        style={styles.progressBar}
      />
      <View style={[styles.flexRow, { marginTop: 8 }]}>
        <Text children="50Kg" category="subhead" status="snow" />
        <Text children="60Kg" category="subhead" status="white" />
      </View>
    </Layout>
  );
};

export default CardWeight;

const themedStyles = StyleService.create({
  progressBar: {
    height: 8,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
