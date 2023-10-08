import React, { memo } from "react";
import createStackNavigator from "./createStackNavigator";
import { CryptoStackParamList } from "./type";

import CoinDetails from "screens/crypto/CoinDetails";
import Home from "screens/crypto/Home";
import MarketScreen from "screens/crypto/MarketScreen";
import Homepage from "screens/crypto/Homepage";
import Exchange from "screens/crypto/Exchange";
import Wallet from "screens/crypto/Wallet";
import Activities from "screens/crypto/Activities/Activities";
import News from "screens/crypto/News";
import NewDetails from "screens/crypto/NewDetails";
import CryptoProfile from "screens/crypto/ProfileCrypto";
import Menu from "screens/crypto/Menu";

const Stack = createStackNavigator<CryptoStackParamList>();

const CryptoStackNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomePage" component={Homepage} />
      <Stack.Screen name="Market" component={MarketScreen} />
      <Stack.Screen name="CoinDetails" component={CoinDetails} />
      <Stack.Screen name="Exchange" component={Exchange} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Activities" component={Activities} />
      <Stack.Screen name="News" component={News} />
      <Stack.Screen name="NewDetails" component={NewDetails} />
      <Stack.Screen name="CryptoProfile" component={CryptoProfile} />
      <Stack.Screen name="Menu" component={Menu} />
    </Stack.Navigator>
  );
});
export default CryptoStackNavigator;
