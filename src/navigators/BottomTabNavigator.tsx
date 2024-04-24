import React, { useContext, useEffect } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NewFeedContext } from '@contexts/NewFeedContext';

import BottomTabBar from './BottomTabBar';
import HomeScreen from '@screens/HomeScreen/HomeScreen';
import MyPageScreen from '@screens/MypageScreen/MyPageScreen';
import MyFeedsScreen from '@screens/MypageScreen/MyFeedsScreen.tsx/MyFeedsScreen';
import CreateFeedModal from '@screens/HomeScreen/CreateFeedModal/CreateFeedModal';

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
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const MyPage = () => {
  return (
    <MyPageStack.Navigator screenOptions={{ headerShown: false }}>
      <MyPageStack.Screen name="MyPage" component={MyPageScreen} />
      <MyPageStack.Screen name="MyFeedsScreen" component={MyFeedsScreen} />
    </MyPageStack.Navigator>
  );
};

export default function BottomTabNavigator() {
  const { setShowCreateFeedModal } = useContext(NewFeedContext);

  let shouldExitApp = false;
  let waitToResetShouldExitApp: NodeJS.Timeout;

  // 뒤로가기 눌렀을 때 안드로이드에서 필요한 처리
  useEffect(() => {
    const backButtonPress = () => {
      if (!shouldExitApp) {
        shouldExitApp = true;
        ToastAndroid.show(
          '뒤로 가기 버튼을 한 번 더 누르면 종료됩니다.',
          ToastAndroid.SHORT,
        );

        waitToResetShouldExitApp = setTimeout(() => {
          shouldExitApp = false;
        }, 2000);
      } else {
        clearTimeout(waitToResetShouldExitApp);
        BackHandler.exitApp();
      }

      return true;
    };

    const backButtonPressHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backButtonPress,
    );

    return () => backButtonPressHandler.remove();
  }, []);

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
        component={CreateFeedModal}
        options={{ headerShown: false }}
        listeners={() => {
          return {
            tabPress: e => {
              e.preventDefault();
              setShowCreateFeedModal(true);
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
