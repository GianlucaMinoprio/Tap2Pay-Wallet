import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";

import Text from "components/Text";
import Content from "components/Content";
import FoodCard, { FoodProps } from "./FoodCard";
import { isEmpty } from "lodash";

interface DataProps {
  data: FoodProps[];
  title: string;
}

const PopularFood = memo(({ data, title }: DataProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text category="title3" marginLeft={24}>
          {title}
        </Text>
        <Layout level={"7"} style={styles.btnAll}>
          <Text category="caption1" status={"snow"}>
            View all
          </Text>
        </Layout>
      </View>
      <Content horizontal contentContainerStyle={styles.content}>
        {isEmpty(data)
          ? null
          : data.map((item, i) => {
              return <FoodCard item={item} key={i} />;
            })}
      </Content>
    </View>
  );
});

export default PopularFood;

const themedStyles = StyleService.create({
  container: {
    marginTop: 8,
    marginBottom: 32,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnAll: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 32,
    marginRight: 24,
  },
  content: {
    paddingLeft: 24,
  },
});
