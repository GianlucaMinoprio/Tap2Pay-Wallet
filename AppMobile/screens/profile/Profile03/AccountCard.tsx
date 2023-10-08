import React from "react";
import { View } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";

import Text from "components/Text";
import Line from "components/Line";
import dayjs from "utils/dayjs";
import { AccountProps } from "constants/Type";


interface ItemCardProps {
  item: AccountProps;
}
const AccountCard = ({ item }: ItemCardProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout level="2" style={styles.layout}>
      <Text
        children="Account"
        marginTop={16}
        category="title4"
        status="white"
      />
      <View style={styles.flexRow}>
        <Text
          children="Gender"
          category="body"
          status="snow"
          marginTop={16}
          marginBottom={14}
        />
        <Text
          children={item.gender}
          category="headline"
          status="white"
          marginTop={16}
          marginBottom={14}
        />
      </View>
      <Line backgroundColor={theme["color-basic-1300"]} marginBottom={16} />
      <View style={styles.flexRow}>
        <Text children="Birthday" category="body" status="snow" />
        <Text
          //   children={dayjs("2019-01-25").format("DD MMM YYYY")}
          children={item.birthday}
          category="headline"
          status="white"
        />
      </View>
      <Line
        backgroundColor={theme["color-basic-1300"]}
        marginBottom={16}
        marginTop={14}
      />

      <View style={styles.flexRow}>
        <Text children="Location" category="body" status="snow" />
        <Text
          children={item.location}
          category="headline"
          status="white"
          marginBottom={24}
        />
      </View>
    </Layout>
  );
};

export default AccountCard;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  layout: {
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 24,
  },
});
