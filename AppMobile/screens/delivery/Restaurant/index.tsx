import React, { memo } from "react";
import { FlatList } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import Container from "components/Container";
import DeliveryHeader from "../Component/DeliveryHeader";
import CourseSearch from "components/CourseSearch";
import { Images } from "assets/images";
import keyExtractor from "utils/keyExtractor";
import RestaurantMenu from "./RestaurantMenu";
import LinearBottom from "components/LinearBottom";

const Restaurant = memo(() => {
  const styles = useStyleSheet(themedStyles);

  const _onSearch = () => {};

  const renderItem = React.useCallback(({ item }) => {
    return <RestaurantMenu item={item} />;
  }, []);
  const ListHeaderComponent = React.useCallback(() => {
    return <CourseSearch _onSearch={_onSearch} style={styles.input} />;
  }, []);

  return (
    <Container style={styles.container} useSafeArea={false}>
      <DeliveryHeader
        title="Restaurant"
        iconLeft="leftArrow"
        iconRight="filter"
      />
      <FlatList
        data={DATA_RESTAURANT}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.content}
        ListHeaderComponent={ListHeaderComponent}
      />
      <LinearBottom
        leftButton={{ icon: "house" }}
        rightButton={{ icon: "heart" }}
      />
    </Container>
  );
});

export default Restaurant;

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
const DATA_RESTAURANT = [
  {
    id: 0,
    name: "Donatlori",
    image: [
      Images.food3,
      Images.food1,
      Images.food2,
      Images.food4,
      Images.food5,
    ],
  },
  {
    id: 1,
    name: "Vincom",
    image: [
      Images.food4,
      Images.food5,
      Images.food2,
      Images.food4,
      Images.food1,
    ],
  },
];
