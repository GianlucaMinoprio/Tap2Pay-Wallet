import React, { memo } from "react";
import Home from "screens/finance/Home";
import RemindBill from "screens/finance/RemindBill/RemindBillScreen";
import Pay from "screens/finance/Transfer/Pay";
import Request from "screens/finance/Transfer/Request";
import TransferScreenOld from "screens/finance/Transfer/Pay";
import createStackNavigator from "./createStackNavigator";



import { FinanceStackParamList } from "./type";

const Stack = createStackNavigator<FinanceStackParamList>();

const FinanceNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pay" component={Pay} />
      <Stack.Screen name="Request" component={Request} />
      <Stack.Screen name="RemindBill" component={RemindBill} />

    </Stack.Navigator>
  );
});
export default FinanceNavigator;
