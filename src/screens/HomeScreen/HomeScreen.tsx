import React from 'react';
import { View } from 'react-native';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { type HomeScreenProps } from '@screens/navigationTypes';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaLayout backgroundColor="slateblue">
      <HomeScreenHeader />
    </SafeAreaLayout>
  );
}

const HomeScreenHeader = () => {
  return <View style={{ backgroundColor: 'teal', height: 50 }}></View>;
};

const HomeScreenTopTabBar = () => {};
