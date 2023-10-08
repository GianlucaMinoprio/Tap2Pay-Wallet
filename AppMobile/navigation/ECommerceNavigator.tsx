import React, { memo } from "react";
import AddToCart from "screens/eCommerce/AddToCart";
import Category from "screens/eCommerce/Category";
import Checkout from "screens/eCommerce/Checkout";
import ECommerceHome from "screens/eCommerce/ECommerceHome";
import GridProduct from "screens/eCommerce/GridProduct";
import Home from "screens/eCommerce/Home";
import ListProduct from "screens/eCommerce/ListProduct";
import OrderTracking from "screens/eCommerce/OrderTracking";
import ProductDetails from "screens/eCommerce/ProductDetails";
import ShopReviews from "screens/eCommerce/ShopReviews";
import ViewCart from "screens/eCommerce/ViewCart";
import createStackNavigator from "./createStackNavigator";

import { ECommerceStackParamList } from "./type";

const Stack = createStackNavigator<ECommerceStackParamList>();

const ECommerceStackNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ECommerceHome" component={ECommerceHome} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="GridProduct" component={GridProduct} />
      <Stack.Screen name="ListProduct" component={ListProduct} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="ShopReviews" component={ShopReviews} />
      <Stack.Screen name="AddToCart" component={AddToCart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="OrderTracking" component={OrderTracking} />
      <Stack.Screen name="ViewCart" component={ViewCart} />
    </Stack.Navigator>
  );
});
export default ECommerceStackNavigator;
