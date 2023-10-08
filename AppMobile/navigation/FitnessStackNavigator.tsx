import React, { memo } from "react";
import createStackNavigator from "./createStackNavigator";

import Home from "screens/fitness/Home";
import { FitnessStackParamList } from "./type";
import HomeFitness from "screens/fitness/HomeFitness";
import SelectGender from "screens/fitness/SelectGender";
import WorkoutPlans from "screens/fitness/WorkoutPlans";
import WorkoutList from "screens/fitness/WorkoutList";
import SetPlan from "screens/fitness/SetPlan";
import Achievements from "screens/fitness/Achievements";
import TrainingCount from "screens/fitness/TrainingCount";
import ConditionHeatMap from "screens/fitness/ConditionHeatMap";
import Running from "screens/fitness/Running";
import Activity from "screens/fitness/Activity";

const Stack = createStackNavigator<FitnessStackParamList>();

const FitnessNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomeFitness" component={HomeFitness} />
      <Stack.Screen name="SelectGender" component={SelectGender} />
      <Stack.Screen name="WorkoutPlans" component={WorkoutPlans} />
      <Stack.Screen name="WorkoutList" component={WorkoutList} />
      <Stack.Screen name="SetPlan" component={SetPlan} />
      <Stack.Screen name="Achievements" component={Achievements} />
      <Stack.Screen name="TrainingCount" component={TrainingCount} />
      <Stack.Screen name="ConditionHeatMap" component={ConditionHeatMap} />
      <Stack.Screen name="Running" component={Running} />
      <Stack.Screen name="Activity" component={Activity} />
    </Stack.Navigator>
  );
});
export default FitnessNavigator;
