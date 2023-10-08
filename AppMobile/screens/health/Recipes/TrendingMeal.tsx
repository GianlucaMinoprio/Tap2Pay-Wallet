import React from "react";
import { View, FlatList } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import Text from "components/Text";
import { Images } from "assets/images";
import TrendMealItem from "./TrendMealItem";
import keyExtractor from "utils/keyExtractor";

const TrendingMeal = () => {
  const styles = useStyleSheet(themedStyles);
  const renderItem = React.useCallback(({ item }) => {
    return <TrendMealItem data={item} />;
  }, []);
  return (
    <View style={styles.container}>
      <Text category="title3" status="white" marginBottom={14} marginLeft={24}>
        Trending
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

export default TrendingMeal;

const themedStyles = StyleService.create({
  container: {
    marginTop: 24,
  },
  content: {
    paddingLeft: 24,
    paddingRight: 8,
  },
});
const data = [
  {
    id: 0,
    name: "sushi hot",
    image: Images.rollsIcon,
    recipes: 31,
    level: "5",
  },
  {
    id: 1,
    name: "mochi suke",
    image: Images.rollsIcon,
    recipes: 31,
    level: "6",
  },
];
