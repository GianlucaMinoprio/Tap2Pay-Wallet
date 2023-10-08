import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";

import Text from "components/Text";
import ActivityCard from "./ActivityCard";

interface DataCardProps {
  title: string;
  value: string | number;
}
interface DataProps {
  id: number;
  avatar: any;
  name: string;
  amount: number;
  data: DataCardProps[];
}
interface Props {
  data: DataProps[];
  title: string;
}

const Activity = memo(({ data, title }: Props) => {
  const styles = useStyleSheet(themedStyles);
  const [dataInput, setDataInput] = React.useState(data);
  return (
    <>
      <View style={styles.title}>
        <Text category="title2">{title}</Text>
        <TouchableOpacity style={styles.btnDelete}>
          <Text category="caption1" status={"snow"} marginRight={4}>
            Delete all
          </Text>
          <Icon pack="assets" name="cancel" style={styles.iconCancel} />
        </TouchableOpacity>
      </View>
      {dataInput.map((item, i) => {
        return (
          <ActivityCard item={item} data={item.data} key={i + item.name} />
        );
      })}
    </>
  );
});

export default Activity;

const themedStyles = StyleService.create({
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  iconCancel: {
    width: 12,
    height: 12,
    tintColor: "text-snow-color",
  },
  btnDelete: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "background-basic-color-2",
    borderRadius: 4,
  },
});
