import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import TrendingMeal from "./TrendingMeal";
import ListRecipes from "./ListRecipes";
import { Data_MealRecipes } from "./data";

const Recipes = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <Layout level="4" style={[{ paddingTop: top }, styles.topNav]}>
        <TopNavigation
          appearance="control"
          accessoryRight={<NavigationAction icon="search" />}
          accessoryLeft={<NavigationAction icon="menu" />}
        />
        <Text
          category="title2"
          status="white"
          marginBottom={8}
          marginLeft={12}
          children="Recipes"
        />
      </Layout>
      <Content
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: bottom + 32 }}
      >
        <TrendingMeal />
        <ListRecipes title={"breakfast"} dataList={Data_MealRecipes} />
        <ListRecipes title={"lunch"} dataList={Data_MealRecipes} />
      </Content>
    </Container>
  );
});

export default Recipes;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  topNav: {
    paddingHorizontal: 4,
  },
});
