import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthContextProvider } from '@contexts/AuthContext';

import Root from '@navigators/RootStack/Root';

const queryClient = new QueryClient();

let App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthContextProvider>
          <GestureHandlerRootView>
            <Root />
          </GestureHandlerRootView>
        </AuthContextProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
