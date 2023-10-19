import React, { memo } from "react";
import Onbroading from "screens/onboarding";

import Onboarding04 from "screens/onboarding/Onboarding04";


import createStackNavigator from "./createStackNavigator";

import { OnboardingParamList } from "./type";

const Stack = createStackNavigator<OnboardingParamList>();

const OnbroadingNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Onboarding" component={Onbroading} />
      <Stack.Screen name="Onboarding04" component={Onboarding04} />
    </Stack.Navigator>
  );
});
export default OnbroadingNavigator;
