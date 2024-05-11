import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NewFeedProvider } from '@contexts/NewFeedContext';
import { AuthContextProvider } from '@contexts/AuthContext';

<<<<<<< HEAD
import BottomTabNavigator from '@navigators/BottomTabNavigator';

import LoginScreen from '@screens/LoginScreen/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen/SignUpScreen';
import ResetPasswordScreen from '@screens/LoginScreen/ResetPasswordScreen';

import { type StackParamList } from '@screens/navigationTypes';

import { COLORS } from '@styles/colors';

const Stack = createNativeStackNavigator<StackParamList>();
=======
import Root from '@navigators/RootStack/Root';
>>>>>>> 04b925ef688c6bc9261415a45124c05626cb1329

export default function App() {
  return (
<<<<<<< HEAD
    // TODO - colors 에러 발생하는 부분 수정
    <NewFeedProvider>
      <NavigationContainer theme={{ colors: { background: COLORS.BG_MAIN } }}>
        <Stack.Navigator>
          {/* TODO - 조건 다시 수정, 작업 위해서 임시로 수정한 상태 */}
          {/* {isSignedIn !== null ? ( */}
          {isSignedIn == null ? (
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
                <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NewFeedProvider>
=======
    <SafeAreaProvider>
      <AuthContextProvider>
        <NewFeedProvider>
          <GestureHandlerRootView>
            <Root />
          </GestureHandlerRootView>
        </NewFeedProvider>
      </AuthContextProvider>
    </SafeAreaProvider>
>>>>>>> 04b925ef688c6bc9261415a45124c05626cb1329
  );
}
