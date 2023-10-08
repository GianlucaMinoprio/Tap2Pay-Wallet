import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { RootStackParamList } from "navigation/type";
import AdMob from "components/AdMob";

const Home = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  interface Props {
    title:
      | "Home"
      | "ECommerceHome"
      | "Category"
      | "GridProduct"
      | "ListProduct"
      | "ProductDetails"
      | "ShopReviews"
      | "AddToCart"
      | "Checkout"
      | "OrderTracking"
      | "ViewCart";
  }
  const Item = ({ title }: Props) => {
    return (
      <Button
        style={styles.item}
        children={title}
        onPress={() => navigate("ECommerce", { screen: title })}
      />
    );
  };

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} title="E-Commerce" />
      <Content contentContainerStyle={styles.content}>
        <Item title="ECommerceHome" />
        <Item title="Category" />
        <Item title="GridProduct" />
        <Item title="ListProduct" />
        <Item title="ProductDetails" />
        <Item title="ShopReviews" />
        <AdMob marginTop={16} />
        <Item title="AddToCart" />
        <Item title="Checkout" />
        <Item title="OrderTracking" />
        <Item title="ViewCart" />
      </Content>
    </Container>
  );
});

export default Home;

const themedStyles = StyleService.create({
  container: {
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  item: {
    marginTop: 12,
  },
});
