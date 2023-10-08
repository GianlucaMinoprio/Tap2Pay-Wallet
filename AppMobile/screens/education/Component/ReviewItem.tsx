import React, { memo } from "react";
import { View, Image } from "react-native";
import { StyleService, useStyleSheet, Avatar } from "@ui-kitten/components";

import Text from "components/Text";
import { Images } from "assets/images";
import StarReview from "./StarReview";

interface Props {
  id: number;
  avatar: any;
  name: string;
  email: string;
  time: string;
  des: string;
  rate: number;
}
interface ItemProps {
  item: Props;
}

const ReviewItem = memo(({ item }: ItemProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <Image
        source={Images.review}
        /* @ts-ignore */
        style={styles.icon}
      />
      <View style={styles.header}>
        <Avatar
          source={item.avatar}
          size={"40"}
          /* @ts-ignore */
          style={styles.avatar}
        />
        <View>
          <Text category="headline">{item.name}</Text>
          <Text category="caption1" status={"placeholder"}>
            {item.email}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <StarReview defaultRate={item.rate} />
        <Text category="caption1" status={"placeholder"}>
          {item.time}
        </Text>
      </View>
      <Text category="caption1" status={"placeholder"} marginHorizontal={36}>
        {item.des}
      </Text>
      <View style={styles.btnIcon}>
        <Image
          source={Images.review}
          /* @ts-ignore */
          style={styles.icon}
        />
      </View>
    </View>
  );
});

export default ReviewItem;

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 8,
    borderWidth: 1,
    marginHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
    borderColor: "background-basic-color-7",
  },
  header: {
    flexDirection: "row",
    marginHorizontal: 36,
    marginBottom: 8,
  },
  icon: {
    width: 32,
    height: 32,
    marginTop: 6,
  },
  avatar: {
    marginRight: 8,
  },
  btnIcon: {
    transform: [{ rotateZ: "180deg" }],
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    marginHorizontal: 36,
  },
});
