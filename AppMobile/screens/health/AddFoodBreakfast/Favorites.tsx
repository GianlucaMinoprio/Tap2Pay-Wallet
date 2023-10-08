import React, { memo } from "react";
import { FlatList } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import { Images } from "assets/images";
import FoodDetails from "./FoodDetails";
import keyExtractor from "utils/keyExtractor";
import { RefreshControl } from "react-native-web-refresh-control";

const Favorites = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const renderItem = React.useCallback(({ item }) => {
    return <FoodDetails data={item} noFavoritesAdd={true} />;
  }, []);
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      refreshControl={<RefreshControl tintColor="#F0DF67" />}
      contentContainerStyle={[styles.content, { paddingBottom: bottom + 32 }]}
    />
  );
});

export default Favorites;

const themedStyles = StyleService.create({
  content: {
    marginHorizontal: 24,
    marginTop: 16,
  },
});
const data = [
  {
    id: 0,
    image: Images.smallPizza,
    cals: 516,
    gam: 55,
    quantity: 1,
    name: "pizza",
  },

  {
    id: 3,
    image: Images.rollsIcon,
    cals: 516,
    gam: 55,
    quantity: 1,
    name: "sushi",
  },
  {
    id: 2,
    image: Images.smallDonut,
    cals: 516,
    gam: 55,
    quantity: 1,
    name: "Donut Cake",
  },

  {
    id: 4,
    image: Images.smallPopcorn,
    cals: 516,
    gam: 55,
    quantity: 1,
    name: "popcorn",
  },
  {
    id: 1,
    image: Images.smallBurger,
    cals: 516,
    gam: 55,
    quantity: 1,
    name: "Hamburger",
  },
];
