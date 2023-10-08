import React, { memo } from "react";
import CourseDetails from "screens/education/CourseDetails";
import CourseStatistic from "screens/education/CourseStatistic";
import Home from "screens/education/Home";
import HomePage from "screens/education/HomePage";
import MyCourse from "screens/education/MyCourse";
import PaymentEducation from "screens/education/PaymentEducation";
import StudentProfile from "screens/education/StudentProfile";
import TeacherProfile from "screens/education/TeacherProfile";
import VideoCourse from "screens/education/VideoCourse";

import createStackNavigator from "./createStackNavigator";

import { EducationStackParamList } from "./type";

const Stack = createStackNavigator<EducationStackParamList>();

const EducationStackNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="MyCourse" component={MyCourse} />
      <Stack.Screen name="CourseDetails" component={CourseDetails} />
      <Stack.Screen name="VideoCourse" component={VideoCourse} />
      <Stack.Screen name="PaymentEducation" component={PaymentEducation} />
      <Stack.Screen name="CourseStatistic" component={CourseStatistic} />
      <Stack.Screen name="StudentProfile" component={StudentProfile} />
      <Stack.Screen name="TeacherProfile" component={TeacherProfile} />
    </Stack.Navigator>
  );
});
export default EducationStackNavigator;
