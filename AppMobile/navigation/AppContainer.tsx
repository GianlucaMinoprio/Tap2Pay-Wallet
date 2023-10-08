import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import createStackNavigator from "./createStackNavigator";
import { RootStackParamList } from "./type";

import Intro from "../screens/intro/Intro";
import OnboardingNavigator from "./OnboardingNavigator";
import AuthNavigator from "./AuthNavigator";
import SocialNavigator from "./SocialNavigator";
import FinanceNavigator from "./FinanceNavigator";
import ProfileNavigator from "./ProfileNavigator";
import ECommerceStackNavigator from "./ECommerceNavigator";
import FitnessNavigator from "./FitnessStackNavigator";
import ReadingStackNavigator from "./ReadingStackNavigator";
import HealthStackNavigator from "./HealthStackNavigator";
import Term from "screens/intro/Term";
import EducationStackNavigator from "./EducationStackNavigator";
import CryptoStackNavigator from "./CryptoStackNavigator";
import DeliveryStackNavigator from "./DeliveryStackNavigator";

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
        <Stack.Screen name="Social" component={SocialNavigator} />
        <Stack.Screen name="Finance" component={FinanceNavigator} />
        <Stack.Screen name="Profile" component={ProfileNavigator} />



        <Stack.Screen name="Health" component={HealthStackNavigator} />
        <Stack.Screen name="Education" component={EducationStackNavigator} />
        <Stack.Screen name="Crypto" component={CryptoStackNavigator} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppContainer;
