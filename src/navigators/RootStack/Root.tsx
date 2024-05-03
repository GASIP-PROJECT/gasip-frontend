import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';

import { MMKVStorage } from '@api/mmkv';
import { useAuth } from '@contexts/AuthContext';

import BottomTabNavigator from '@navigators/BottomTabNavigator';

import LoginScreen from '@screens/LoginScreen/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen/SignUpScreen';
import CreateFeedModal from '@screens/HomeScreen/CreateFeedModal/CreateFeedModal';
import FeedDetailScreen from '@screens/HomeScreen/FeedDetailScreen/FeedDetailScreen';
import ProfessorDetailScreen from '@screens/HomeScreen/ProfessorScreen/ProfessorScreen';

import { type StackParamList } from '@screens/navigationTypes';

import { COLORS } from '@styles/colors';

const RootStack = createNativeStackNavigator<StackParamList>();

export default function Root() {
  const { authState, dispatch } = useAuth();

  const checkUserToken = () => {
    const userToken = MMKVStorage.getString('userToken');

    if (!userToken) return null;
    return userToken;
  };

  const authenticateUser = async () => {
    const userToken = checkUserToken();

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

  const hideBootSplash = async () => {
    await BootSplash.hide({ fade: true });
  };

  useEffect(() => {
    console.log('App launch');
    // 최초 앱 로딩 시 처리
    authenticateUser();

    // keychain에 저장된 토큰 값 존재 검사 및 유효성 확인
    setTimeout(() => {
      hideBootSplash();
    }, 500);
  }, []);

  return (
    <NavigationContainer theme={{ colors: { background: COLORS.BG_MAIN } }}>
      <RootStack.Navigator>
        {/* TODO - 조건 다시 수정, 작업 위해서 임시로 수정한 상태 */}
        {authState.userToken === null ? (
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
        ) : (
          <>
            <RootStack.Screen
              name="BottomTabNavigator"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="FeedDetailScreen"
              component={FeedDetailScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="ProfessorDetailScreen"
              component={ProfessorDetailScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </RootStack.Navigator>
      <CreateFeedModal />
    </NavigationContainer>
  );
}
