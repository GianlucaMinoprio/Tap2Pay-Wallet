import React, { memo } from "react";
import Home from "screens/auth";
import SignUp from "screens/auth/SignUp";
import SignIn from "screens/auth/SignIn";

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
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
});
export default AuthNavigator;
