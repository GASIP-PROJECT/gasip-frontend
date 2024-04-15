import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NewFeedProvider } from '@contexts/NewFeedContext';

import BottomTabNavigator from '@navigators/BottomTabNavigator';

import LoginScreen from '@screens/LoginScreen/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen/SignUpScreen';

import { type StackParamList } from '@screens/navigationTypes';

import { COLORS } from '@styles/colors';

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  const isSignedIn = 'null'; // 임시로 로그인 여부를 처리하기 위한 state, 추후에 로그인 데이터를 담고 있는 state로 변경 필요

  return (
    // TODO - colors 에러 발생하는 부분 수정
    <NewFeedProvider>
      <NavigationContainer theme={{ colors: { background: COLORS.BG_MAIN } }}>
        <Stack.Navigator>
          {/* TODO - 조건 다시 수정, 작업 위해서 임시로 수정한 상태 */}
          {/* {isSignedIn !== null ? ( */}
          {isSignedIn !== null ? (
            <Stack.Screen
              name="BottomTabNavigator"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NewFeedProvider>
  );
}
