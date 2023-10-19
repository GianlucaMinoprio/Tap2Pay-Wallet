import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import createStackNavigator from "./createStackNavigator";
import { RootStackParamList } from "./type";

import Intro from "../screens/intro/Intro";
import OnboardingNavigator from "./OnboardingNavigator";
import AuthNavigator from "./AuthNavigator";
import FinanceNavigator from "./FinanceNavigator";
import Term from "screens/intro/Term";

const Stack = createStackNavigator<RootStackParamList>();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Intro"
      >
        <Stack.Screen name="Term" component={Term} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Onbroading" component={OnboardingNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Finance" component={FinanceNavigator} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppContainer;
