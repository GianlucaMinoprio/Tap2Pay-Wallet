import React, { memo } from "react";
import Home from "screens/auth";
import Authenticate from "screens/auth/Authenticate";
import CreateNewProfile from "screens/auth/CreateNewProfile";
import ForgotPassword from "screens/auth/ForgotPassword";
import SignIn01 from "screens/auth/SignIn01";
import SignIn02 from "screens/auth/SignIn02";
import SignIn04 from "screens/auth/SignIn04";
import SignInDefi from "screens/auth/SignInDefi";
import SignUp01 from "screens/auth/SignUp01";
import SignUp02 from "screens/auth/SignUp02";
import Verify from "screens/auth/Verify";
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
      <Stack.Screen name="SignIn01" component={SignIn01} />
      <Stack.Screen name="SignIn02" component={SignIn02} />
      <Stack.Screen name="SignInDefi" component={SignInDefi} />
      <Stack.Screen name="SignIn04" component={SignIn04} />
      <Stack.Screen name="SignUp01" component={SignUp01} />
      <Stack.Screen name="SignUp02" component={SignUp02} />
      <Stack.Screen name="Authenticate" component={Authenticate} />
      <Stack.Screen name="CreateNewProfile" component={CreateNewProfile} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verify" component={Verify} />
    </Stack.Navigator>
  );
});
export default AuthNavigator;
