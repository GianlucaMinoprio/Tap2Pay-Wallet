import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import CardCals from "../HomeHealth/CardCals";
import FoodItem from "./FoodItem";

const AddFoodLunch = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        title="LUNCH"
        accessoryRight={
          <View style={styles.rightNav}>
            <NavigationAction icon="download" />
            <NavigationAction icon="menu" />
          </View>
        }
        accessoryLeft={<NavigationAction icon="leftArrow" />}
      />
      <Content contentContainerStyle={styles.content}>
        <Image
          source={Images.pizzaLunch}
          style={[
            /* @ts-ignore */
            styles.image,
          ]}
        />
        <CardCals totalCals={3000} cals={1879} title={"Cals"} />
      </Content>
      <Layout style={styles.bottom} level="2">
        <FoodItem quantity={1} title="Pizza" cals={135} />
        <FoodItem quantity={2} title="Eggs" cals={35} />
        <Button
          children="Add More Food"
          style={[
            styles.button,
            { marginBottom: bottom + 8, marginTop: (46 * 812) / height },
          ]}
        />
      </Layout>
    </Container>
  );
});

export default AddFoodLunch;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNav: {
    paddingHorizontal: 4,
  },
  rightNav: {
    flexDirection: "row",
  },
  content: {
    paddingBottom: 24,
  },
  image: {
    alignSelf: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  bottom: {
    paddingTop: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  button: {
    marginLeft: 40,
    marginRight: 44,
  },
});
