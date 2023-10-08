import React, { memo } from "react";
import Home from "screens/social";
import Contact from "screens/social/Contact";
import Conversation from "screens/social/Conversation";
import FindFriend from "screens/social/FindFriend";
import HomeRaise from "screens/social/HomeRaise";
import NewFeed from "screens/social/NewFeed";
import SearchScr from "screens/social/SearchScreen";
import SendPhotoVoice from "screens/social/SendPhotoVoice";
import Story from "screens/social/Story";
import VideoCall from "screens/social/VideoCall";
import ViewPhoto from "screens/social/ViewPhoto";

import createStackNavigator from "./createStackNavigator";

import { SocialStackParamList } from "./type";

const Stack = createStackNavigator<SocialStackParamList>();
const SocialNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewFeed" component={NewFeed} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="FindFriend" component={FindFriend} />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen name="SendPhotoVoice" component={SendPhotoVoice} />
      <Stack.Screen name="HomeRaise" component={HomeRaise} />
      <Stack.Screen name="ViewPhoto" component={ViewPhoto} />
      <Stack.Screen name="Conversation" component={Conversation} />
      <Stack.Screen name="SearchScr" component={SearchScr} />
      <Stack.Screen name="VideoCall" component={VideoCall} />
    </Stack.Navigator>
  );
});
export default SocialNavigator;
