import React from 'react';
import { Text } from 'react-native';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

export default function MyPageScreen() {
  return (
    <SafeAreaLayout style={{ flex: 1 }}>
      <Text>MyPageScreen</Text>
    </SafeAreaLayout>
  );
}
