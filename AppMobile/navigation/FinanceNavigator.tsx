import React, { memo } from "react";
import AddTransactionScreen from "screens/finance/AddTransaction/AddTransactionScreen";
import AssetScreen from "screens/finance/asset/AssetScreen";
import AssetReportScreen from "screens/finance/AssetReport/AssetReportScreen";
import CategoryTransaction from "screens/finance/CategoryTransaction";
import EWalletScreen from "screens/finance/EWallet/EWalletScreen";
import Home from "screens/finance/Home";
import ListTransaction from "screens/finance/ListTransaction";
import MonthChartScreen from "screens/finance/MonthChart/MonthChartScreen";
import PortfolioScreen from "screens/finance/Portfolio/PortfolioScreen";
import RemindBill from "screens/finance/RemindBill/RemindBillScreen";
import TransferScreen from "screens/finance/Transfer/TransferScreen";
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
      <Stack.Screen name="Asset" component={AssetScreen} />
      <Stack.Screen name="AssetReport" component={AssetReportScreen} />
      <Stack.Screen name="MonthChart" component={MonthChartScreen} />
      <Stack.Screen name="ListTransaction" component={ListTransaction} />
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
      <Stack.Screen
        name="CategoryTransaction"
        component={CategoryTransaction}
      />
      <Stack.Screen name="Transfer" component={TransferScreen} />
      <Stack.Screen name="EWallet" component={EWalletScreen} />
      <Stack.Screen name="RemindBill" component={RemindBill} />
      <Stack.Screen name="Portfolio" component={PortfolioScreen} />
    </Stack.Navigator>
  );
});
export default FinanceNavigator;
