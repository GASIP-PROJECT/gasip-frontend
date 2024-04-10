import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

import HomeScreenHeader from './HomeScreenHeader';
import HomeScreenTabBar from './HomeScreenTabBar';

import Spacer from '@components/common/Spacer';

export default function HomeScreen() {
  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <HomeScreenHeader />
        <Spacer type="height" value={13} />
        <HomeScreenTabBar />
      </View>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
