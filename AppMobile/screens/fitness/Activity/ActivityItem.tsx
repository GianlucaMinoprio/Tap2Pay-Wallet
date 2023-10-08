import React from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";

import Text from "components/Text";
import dayjs from "utils/dayjs";

interface Props {
  id: number;
  day: number;
  km: number;
  time: string;
  route: ImageSourcePropType;
}
interface DATAProps {
  data: Props;
}
const ActivityItem = ({ data }: DATAProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[styles.container]}>
      <Layout level="4" style={styles.day}>
        <Text category="headline">{dayjs(data.day).format("DD")}</Text>
        <Text category="caption1" status="grey300" uppercase>
          {dayjs(data.day).format("MMM")}
        </Text>
      </Layout>
      <View style={styles.flexRow}>
        <Text category="title4">{`${data.km}`}</Text>
        <Text
          children="km"
          category="subhead"
          status="placeholder"
          marginLeft={4}
          marginTop={4}
        />
      </View>
      <View style={styles.flexRow}>
        <Text category="title4">{data.time}</Text>
        <Text
          children="min"
          category="subhead"
          status="placeholder"
          marginLeft={4}
          marginTop={4}
        />
      </View>
      <Image source={data.route}
       /* @ts-ignore */
       style={styles.route} />
    </View>
  );
};

export default ActivityItem;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 28,
    marginRight: 28,
    borderBottomColor: "text-description-color",
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  flexRow: {
    flexDirection: "row",
  },
  route: {
    height: 32,
    width: 50,
  },
  day: {
    borderRadius: 4,
    padding: 2,
    marginBottom: 16,
    width: 40,
    alignItems: "center",
  },
});
