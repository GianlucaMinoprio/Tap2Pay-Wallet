import React from "react";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import { ReadingStackParamList } from "./type";
import createStackNavigator from "./createStackNavigator";
import Home from "screens/reading/Home";
import HomeReading from "screens/reading/HomeReading";
import ListBook from "screens/reading/ListBook";
import BookDetails from "screens/reading/BookDetails";
import Question from "screens/reading/Question";
import ListenBook from "screens/reading/ListenBook";
import BookMarkCollection from "screens/reading/BookMarkCollection";
import BookMarkList from "screens/reading/BookMarkList";
import Checkout from "screens/reading/Checkout";
import OrderTracking from "screens/reading/OrderTracking";
import HomeBook from "screens/reading/HomeBook";

const ReadingStackNavigator = () => {
  const styles = useStyleSheet(themedStyles);

  const Stack = createStackNavigator<ReadingStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomeReading" component={HomeReading} />
      <Stack.Screen name="ListBook" component={ListBook} />
      <Stack.Screen name="BookDetails" component={BookDetails} />
      <Stack.Screen name="Question" component={Question} />
      <Stack.Screen name="ListenBook" component={ListenBook} />
      <Stack.Screen name="BookMarkCollection" component={BookMarkCollection} />
      <Stack.Screen name="BookMarkList" component={BookMarkList} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="OrderTracking" component={OrderTracking} />
      <Stack.Screen name="HomeBook" component={HomeBook} />
    </Stack.Navigator>
  );
};

export default ReadingStackNavigator;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});
