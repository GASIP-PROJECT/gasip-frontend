import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';

import { MMKVStorage } from '@api/mmkv';
import { useAuth } from '@contexts/AuthContext';

import HomeScreen from '@screens/HomeScreen/HomeScreen';
import LoginScreen from '@screens/LoginScreen/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen/SignUpScreen';
import CreateFeedModal from '@screens/HomeScreen/CreateFeedModal/CreateFeedModal';
import FeedDetailScreen from '@screens/HomeScreen/FeedDetailScreen/FeedDetailScreen';
import ProfessorDetailScreen from '@screens/HomeScreen/ProfessorScreen/ProfessorScreen';
import SearchScreenWithContext from '@screens/HomeScreen/SearchScreen/SearchScreenWithContext';

import { COLORS } from '@styles/colors';

const RootStack = createStackNavigator();

const themeColor = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.BG_MAIN,
  },
};

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
    <NavigationContainer theme={themeColor}>
      <RootStack.Navigator>
        {/* TODO - 조건 다시 수정, 작업 위해서 임시로 수정한 상태 */}
        {authState.userToken === null ? (
          <RootStack.Group>
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
          </RootStack.Group>
        ) : (
          <RootStack.Group>
            <RootStack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="SearchScreen"
              component={SearchScreenWithContext}
              options={{
                headerShown: false,
              }}
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
          </RootStack.Group>
        )}
      </RootStack.Navigator>
      <CreateFeedModal />
    </NavigationContainer>
  );
}
