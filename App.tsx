import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '@screens/LoginScreen/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen/SignUpScreen';
import CreateFeedModal from '@screens/HomeScreen/CreateFeedModal';

const Stack = createNativeStackNavigator();

export default function App() {
  const isSignedIn = false; // 임시로 로그인 여부를 처리하기 위한 state, 추후에 로그인 데이터를 담고 있는 state로 변경 필요

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CreateFeedModal"
                component={CreateFeedModal}
                options={{
                  headerShown: false,
                  gestureDirection:
                    Platform.OS === 'ios' ? 'vertical' : 'horizontal',
                }}
              />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
