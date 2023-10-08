import React, { memo } from "react";
import FoodAndDrink from "screens/delivery/FoodAndDrink";
import FoodDetails from "screens/delivery/FoodDetails";
import Home from "screens/delivery/Home";
import Homepage from "screens/delivery/Homepage";
import MyOrder from "screens/delivery/MyOrder";
import Payment from "screens/delivery/Payment";
import Restaurant from "screens/delivery/Restaurant";
import RestaurantDetails from "screens/delivery/RestaurantDetails";
import SuccessOrder from "screens/delivery/SuccessOrder";
import TrackingOrder from "screens/delivery/TrackingOrder";
import createStackNavigator from "./createStackNavigator";
import { DeliveryStackParamList } from "./type";

const Stack = createStackNavigator<DeliveryStackParamList>();

const DeliveryStackNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomePage" component={Homepage} />
      <Stack.Screen name="FoodAndDrink" component={FoodAndDrink} />
      <Stack.Screen name="FoodDetails" component={FoodDetails} />
      <Stack.Screen name="Restaurant" component={Restaurant} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Success" component={SuccessOrder} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
      <Stack.Screen name="TrackingOrder" component={TrackingOrder} />
    </Stack.Navigator>
  );
});
export default DeliveryStackNavigator;
