import React, { memo } from "react";
import Onbroading from "screens/onboarding";
import Onboarding01 from "screens/onboarding/Onboarding01";
import Onboarding02 from "screens/onboarding/Onboarding02";
import Onboarding03 from "screens/onboarding/Onboarding03";
import Onboarding04 from "screens/onboarding/Onboarding04";
import Onboarding05 from "screens/onboarding/Onboarding05";
import Onboarding06 from "screens/onboarding/Onboarding06";
import Onboarding07 from "screens/onboarding/Onboarding07";
import Onboarding08 from "screens/onboarding/Onboarding08";
import Onboarding09 from "screens/onboarding/Onboarding09";
import Onboarding10 from "screens/onboarding/Onboarding10";

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
      <Stack.Screen name="Onboarding01" component={Onboarding01} />
      <Stack.Screen name="Onboarding02" component={Onboarding02} />
      <Stack.Screen name="Onboarding03" component={Onboarding03} />
      <Stack.Screen name="Onboarding04" component={Onboarding04} />
      <Stack.Screen name="Onboarding05" component={Onboarding05} />
      <Stack.Screen name="Onboarding06" component={Onboarding06} />
      <Stack.Screen name="Onboarding07" component={Onboarding07} />
      <Stack.Screen name="Onboarding08" component={Onboarding08} />
      <Stack.Screen name="Onboarding09" component={Onboarding09} />
      <Stack.Screen name="Onboarding10" component={Onboarding10} />
    </Stack.Navigator>
  );
});
export default OnbroadingNavigator;
