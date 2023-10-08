import React, { memo } from "react";
import Home from "screens/profile/Home";
import Profile01 from "screens/profile/Profile01";
import Profile02 from "screens/profile/Profile02";
import Profile03 from "screens/profile/Profile03";
import Profile04 from "screens/profile/Profile04";
import Profile05 from "screens/profile/Profile05";
import Profile06 from "screens/profile/Profile06";
import Profile07 from "screens/profile/Profile07";
import Profile08 from "screens/profile/Profile08";
import Profile09 from "screens/profile/Profile09";
import Profile10 from "screens/profile/Profile10";
import createStackNavigator from "./createStackNavigator";
import { ProfileStackParamList } from "./type";

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile01" component={Profile01} />
      <Stack.Screen name="Profile02" component={Profile02} />
      <Stack.Screen name="Profile03" component={Profile03} />
      <Stack.Screen name="Profile04" component={Profile04} />
      <Stack.Screen name="Profile05" component={Profile05} />
      <Stack.Screen name="Profile06" component={Profile06} />
      <Stack.Screen name="Profile07" component={Profile07} />
      <Stack.Screen name="Profile08" component={Profile08} />
      <Stack.Screen name="Profile09" component={Profile09} />
      <Stack.Screen name="Profile10" component={Profile10} />
    </Stack.Navigator>
  );
});
export default ProfileNavigator;
