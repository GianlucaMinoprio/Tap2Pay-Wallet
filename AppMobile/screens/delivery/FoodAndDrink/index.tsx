import React, { memo } from "react";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import Content from "components/Content";
import Container from "components/Container";
import DeliveryHeader from "../Component/DeliveryHeader";
import CourseSearch from "components/CourseSearch";
import LinearBottom from "components/LinearBottom";
import { Images } from "assets/images";
import PopularFood from "../Component/PopularFood";

const FoodAndDrink = memo(() => {
  const styles = useStyleSheet(themedStyles);

  const _onSearch = () => {};
  return (
    <Container style={styles.container} useSafeArea={false}>
      <DeliveryHeader
        title="Food and Drink"
        shoppingCart={3}
        iconLeft="leftArrow"
      />
      <Content contentContainerStyle={styles.content}>
        <CourseSearch _onSearch={_onSearch} style={styles.input} />
        <PopularFood data={DATA_FOOD} title="🍖 Food" />
        <PopularFood data={DATA_DRINK} title="☕️ Drink" />
      </Content>
      <LinearBottom
        leftButton={{ icon: "house" }}
        rightButton={{ icon: "heart" }}
      />
    </Container>
  );
});

export default FoodAndDrink;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 24,
  },
  content: {
    paddingBottom: 140,
  },
});
const DATA_DRINK = [
  {
    id: 0,
    name: "Ice Cream Jolibee",
    price: 2.34,
    rate: 4,
    distance: 10,
    image: Images.coffee,
    ratio: 0.9,
  },
  {
    id: 1,
    name: "Chicken katsu",
    price: 4.99,
    rate: 4,
    image: Images.milkshake,
    distance: 10,
    ratio: 119.6 / 121,
  },
];
const DATA_FOOD = [
  {
    id: 0,
    name: "Ice Cream Jolibee",
    price: 2.34,
    rate: 4,
    distance: 10,
    image: Images.ramen,
    ratio: 1.2,
  },
  {
    id: 1,
    name: "Chicken katsu",
    price: 4.99,
    rate: 4,
    image: Images.chickenBucket,
    distance: 10,
    ratio: 119.6 / 121,
  },
  {
    id: 2,
    name: "Chicken katsu",
    price: 4.99,
    rate: 4,
    image: Images.chickenBucket,
    distance: 10,
    ratio: 119.6 / 121,
  },
];
