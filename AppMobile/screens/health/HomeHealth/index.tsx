import React, { memo } from "react";
import { View, ScrollView } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  useTheme,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import CardCals from "./CardCals";
import { dataMeal, Data_Weight } from "./data";
import ItemMeal from "./ItemMeal";
import { RefreshControl } from "react-native-web-refresh-control";
import CardWeightChart from "./Chart";

const HomeHealth = memo(() => {
  const { top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <Layout style={[{ paddingTop: top }, styles.nav]} level="8">
        <View style={styles.topNav}>
          <NavigationAction icon="calendar" />
          <NavigationAction icon="notification" />
        </View>
        <Text category="title2" status="white" marginLeft={12}>
          Today
        </Text>
      </Layout>
      <Content
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
        contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
      >
        <CardCals totalCals={3000} cals={1879} title={"Cals"} />
        <CardWeightChart
          strokeColor={theme["color-primary-100"]}
          data={Data_Weight}
          style={styles.cardWeight}
          haveRightArrow
          title="weight"
        />
        <ScrollView
          contentContainerStyle={styles.mealView}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          {dataMeal.map((item, index) => {
            return <ItemMeal data={item} key={index} />;
          })}
        </ScrollView>
      </Content>
    </Container>
  );
});

export default HomeHealth;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  nav: {
    paddingBottom: 8,
    paddingHorizontal: 4,
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 4,
  },
  content: {
    marginTop: 24,
  },
  cardWeight: {
    marginVertical: 24,
  },
  mealView: {
    flexDirection: "row",
    paddingLeft: 24,
    paddingRight: 12,
  },
});
