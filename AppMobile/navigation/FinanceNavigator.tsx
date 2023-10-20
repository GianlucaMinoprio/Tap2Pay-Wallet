import React, { memo } from "react";
import Home from "screens/finance/Home";
import RemindBill from "screens/finance/RemindBill/RemindBillScreen";
import TransferScreen from "screens/finance/Transfer/TransferScreen";
import TransferScreenOld from "screens/finance/Transfer/TransferScreen";
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
      <Stack.Screen name="Transfer" component={TransferScreen} />
      <Stack.Screen name="RemindBill" component={RemindBill} />

    </Stack.Navigator>
  );
});
export default FinanceNavigator;
