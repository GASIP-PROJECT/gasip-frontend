import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthContextProvider } from '@contexts/AuthContext';

import Root from '@navigators/RootStack/Root';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <GestureHandlerRootView>
          <Root />
        </GestureHandlerRootView>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}
