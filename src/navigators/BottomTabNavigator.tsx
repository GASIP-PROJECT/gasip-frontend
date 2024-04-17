import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabBar from './BottomTabBar';
import HomeScreen from '@screens/HomeScreen/HomeScreen';
import MyPageScreen from '@screens/MypageScreen/MyPageScreen';
import CreateFeedModal from '@screens/HomeScreen/CreateFeedModal/CreateFeedModal';
import FeedDetailScreen from '@screens/HomeScreen/FeedDetailScreen/FeedDetailScreen';
import MyFeedsScreen from '@screens/MypageScreen/MyFeedsScreen.tsx/MyFeedsScreen';

import {
  type HomeStackParamList,
  type BottomTabParamList,
  type MyPageStackParamList,
} from '@screens/navigationTypes';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const MyPageStack = createNativeStackNavigator<MyPageStackParamList>();

const Home = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="CreateFeed0"
        component={CreateFeedModal}
        options={{ presentation: 'fullScreenModal' }}
      />
      <HomeStack.Screen name="FeedDetail" component={FeedDetailScreen} />
    </HomeStack.Navigator>
  );
};

const MyPage = () => {
  return (
    <MyPageStack.Navigator screenOptions={{ headerShown: false }}>
      <MyPageStack.Screen name="MyPage" component={MyPageScreen} />
      <MyPageStack.Screen
        name="CreateFeed2"
        component={CreateFeedModal}
        options={{ presentation: 'fullScreenModal' }}
      />
      <MyPageStack.Screen name="MyFeedsScreen" component={MyFeedsScreen} />
    </MyPageStack.Navigator>
  );
};

const CreateFeed = () => null;

// TODO - 글로벌 모달 + 하단 네비게이션을 구현하기에 이게 맞는 방법인지 고민 필요
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={props => <BottomTabBar {...props} />}
    >
      <Tab.Screen
        name="HomeStack"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="CreateFeed"
        component={CreateFeed}
        options={{ headerShown: false }}
        listeners={({ navigation }) => {
          return {
            tabPress: e => {
              e.preventDefault();
              navigation.navigate(`CreateFeed${navigation.getState().index}`);
            },
          };
        }}
      />
      <Tab.Screen
        name="MyPageStack"
        component={MyPage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
