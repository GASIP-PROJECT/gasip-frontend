import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@contexts/AuthContext';
import BottomTabNavigator from '@navigators/BottomTabNavigator';

import SplashScreen from '@screens/SplashScreen';
import LoginScreen from '@screens/LoginScreen/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen/SignUpScreen';
import CreateFeedModal from '@screens/HomeScreen/CreateFeedModal/CreateFeedModal';

import { type StackParamList } from '@screens/navigationTypes';

import { COLORS } from '@styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = createNativeStackNavigator<StackParamList>();

export default function Root() {
  const { authState, dispatch } = useAuth();

  const checkUserToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      return userToken;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const authenticateUser = async () => {
    const userToken = await checkUserToken();

    if (userToken) {
      dispatch({
        type: 'RESTORE_TOKEN',
        payload: { userToken, isLoading: false },
      });
    } else {
      dispatch({
        type: 'SIGN_IN',
        payload: { userToken: null, isLoading: false },
      });
    }
  };

  useEffect(() => {
    console.log('App launch');
    // 최초 앱 로딩 시 처리

    // keychain에 저장된 토큰 값 존재 검사 및 유효성 확인
    setTimeout(() => {
      authenticateUser();
    }, 500);
  }, []);

  if (authState.isLoading) return <SplashScreen />;

  return (
    <NavigationContainer theme={{ colors: { background: COLORS.BG_MAIN } }}>
      <RootStack.Navigator>
        {/* TODO - 조건 다시 수정, 작업 위해서 임시로 수정한 상태 */}
        {/* {isSignedIn === null ? ( */}
        {authState.userToken !== null ? (
          <RootStack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <RootStack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </RootStack.Navigator>
      <CreateFeedModal />
    </NavigationContainer>
  );
}