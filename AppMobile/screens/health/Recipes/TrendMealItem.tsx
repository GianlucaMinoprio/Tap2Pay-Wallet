import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";

interface Props {
  id: number;
  image: ImageSourcePropType;
  recipes: number;
  name: string;
  level: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
}
interface ItemProps {
  data: Props;
}

const TrendMealItem = ({ data }: ItemProps) => {
  const { level, image, id, recipes, name } = data;
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout
      style={[
        styles.container,
        { width: 241 * (width / 375), height: 210 * (height / 812) },
      ]}
      level={level}
    >
      <Image
        source={image}
        /* @ts-ignore */
        style={styles.image}
      />
      <Text capitalize category="title4" status="white" marginBottom={8}>
        {name}
      </Text>
      <Text category="subhead" status="white" opacity={0.5}>
        {recipes} Recipes
      </Text>
    </Layout>
  );
};

export default TrendMealItem;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "background-basic-color-7",
    paddingTop: 32,
    paddingRight: 32,
    paddingLeft: 24,
    paddingBottom: 24,
    marginRight: 16,
  },
  image: {
    width: 80,
    height: 69,
    alignSelf: "flex-end",
    marginBottom: 33,
  },
});
