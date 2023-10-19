import React, { memo } from "react";
import Home from "screens/auth";
import SignIn02 from "screens/auth/SignIn02";
import createStackNavigator from "./createStackNavigator";

import { AuthStackParamList } from "./type";

const Stack = createStackNavigator<AuthStackParamList>();
const AuthNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignIn02" component={SignIn02} />
    </Stack.Navigator>
  );
});
export default AuthNavigator;
