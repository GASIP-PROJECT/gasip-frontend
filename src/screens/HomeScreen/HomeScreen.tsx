import React from 'react';
import { View } from 'react-native';

import GSIcon from '@components/common/GSIcon';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { type HomeScreenProps } from '@screens/navigationTypes';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaLayout backgroundColor="slateblue">
      <HomeScreenHeader />
      <GSIcon iconName="가십 아이콘" />
    </SafeAreaLayout>
  );
}

const HomeScreenHeader = () => {
  return <View style={{ backgroundColor: 'teal', height: 50 }}></View>;
};

const HomeScreenTopTabBar = () => {};
