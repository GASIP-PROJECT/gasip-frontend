import React from 'react';
import { Text, View } from 'react-native';

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#4b5159',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: '700', color: 'white' }}>
        GASIP
      </Text>
    </View>
  );
}
