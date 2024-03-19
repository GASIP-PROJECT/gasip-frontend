import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '@screens/HomeScreen/HomeScreen';
import MyPageScreen from '@screens/MypageScreen/MyPageScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{}}></Tab.Screen>
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{}}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
