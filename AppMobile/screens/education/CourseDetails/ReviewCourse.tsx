import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import { Images } from "assets/images";
import ReviewItem from "../Component/ReviewItem";

const ReviewCourse = memo(() => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <View>
        {DATA.map((item, _) => {
          return <ReviewItem item={item} key={_} />;
        })}
      </View>
    </View>
  );
});

export default ReviewCourse;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
});
const DATA = [
  {
    id: 0,
    avatar: Images.avatar0,
    name: "John Beckham",
    email: "snow123@gmail.com",
    time: "14 July 2021",
    rate: 4,
    des: "“ When an unknown printer took a galley of type and scrambled it to make a specimen book unknown printer. ”",
  },
  {
    id: 1,
    avatar: Images.avatar1,
    name: "Alex Dumino",
    email: "snow123@gmail.com",
    time: "14 July 2021",
    rate: 5,
    des: "“ When an unknown printer took a galley of type and scrambled it to make a t specimen book unknown printer. ”",
  },
  {
    id: 2,
    avatar: Images.avatar2,
    name: "Alex Smith",
    email: "snow123@gmail.com",
    time: "14 July 2021",
    rate: 5,
    des: "“ When an unknown printer took a galley of type and scrambled it to make a t specimen book unknown printer. ”",
  },
];
