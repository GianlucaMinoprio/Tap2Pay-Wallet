import React, { memo } from "react";

import { StyleService, useStyleSheet } from "@ui-kitten/components";

import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import DeliveryHeader from "../Component/DeliveryHeader";
import CourseSearch from "components/CourseSearch";
import PopularFood from "../Component/PopularFood";
import Restaurant from "./Restaurant";
import LinearBottom from "components/LinearBottom";

const Homepage = memo(() => {
  const styles = useStyleSheet(themedStyles);

  const _onSearch = React.useCallback(() => {}, []);
  return (
    <Container style={styles.container} useSafeArea={false}>
      <DeliveryHeader title="Hello, Snow 😍" shoppingCart={2} bold />
      <Content contentContainerStyle={styles.content}>
        <CourseSearch _onSearch={_onSearch} style={styles.input} />
        <PopularFood data={DATA_POPULAR} title="Popular Food" />
        <Restaurant data={DATA_RESTAURANT} />
      </Content>
      <LinearBottom
        leftButton={{ icon: "house" }}
        rightButton={{ icon: "heart" }}
      />
    </Container>
  );
});

export default Homepage;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 16,
  },
  input: {
    margin: 24,
  },
  content: {
    paddingBottom: 140,
  },
});
const DATA_POPULAR = [
  {
    id: 0,
    name: "Ice Cream Jolibee",
    price: 2.34,
    rate: 4,
    distance: 10,
    image: Images.iceCream,
    ratio: 1,
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
];
const DATA_RESTAURANT = [
  {
    id: 0,
    name: "Pizza Hut - Kim Ma Thuong",
    location: "212 - Kim Ma Thuong - Ba Dinh - Ha Noi",
    far: 10,
    rate: 4,
    image: Images.restaurant,
    menu: ["pizza", "spaghetti", "bugger"],
  },
  {
    id: 1,
    name: "Pizza Hut - Kim Ma Thuong",
    location: "212 - Kim Ma Thuong - Ba Dinh - Ha Noi",
    far: 10,
    rate: 4,
    image: Images.restaurant,
    menu: ["pizza", "Potato chips", "bugger"],
  },
];
