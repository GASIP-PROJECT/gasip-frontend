import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
        <View
          style={{
            backgroundColor: 'slateblue',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Appfss</Text>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}
