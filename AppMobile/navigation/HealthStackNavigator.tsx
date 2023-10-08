import React, { memo } from "react";
import Home from "screens/health";
import Activity from "screens/health/Activity";
import AddFoodBreakfast from "screens/health/AddFoodBreakfast";
import AddFoodLunch from "screens/health/AddFoodLunch";
import FoodInformation from "screens/health/FoodInformation";
import HomeHealth from "screens/health/HomeHealth";
import PlanDetails from "screens/health/PlanDetails";
import Recipes from "screens/health/Recipes";
import SetPlan from "screens/health/SetPlan";
import UpdateWeight from "screens/health/UpdateWeight";
import WaterGoal from "screens/health/WaterGoal";
import createStackNavigator from "./createStackNavigator";
import { HealthStackParamList } from "./type";

const Stack = createStackNavigator<HealthStackParamList>();

const HealthStackNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomeHealth" component={HomeHealth} />
      <Stack.Screen name="UpdateWeight" component={UpdateWeight} />
      <Stack.Screen name="WaterGoal" component={WaterGoal} />
      <Stack.Screen name="AddFoodLunch" component={AddFoodLunch} />
      <Stack.Screen name="FoodInformation" component={FoodInformation} />
      <Stack.Screen name="AddFoodBreakfast" component={AddFoodBreakfast} />
      <Stack.Screen name="Recipes" component={Recipes} />
      <Stack.Screen name="SetPlan" component={SetPlan} />
      <Stack.Screen name="PlanDetails" component={PlanDetails} />
      <Stack.Screen name="Activity" component={Activity} />
    </Stack.Navigator>
  );
});
export default HealthStackNavigator;
