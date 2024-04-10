import React from 'react';
import { StyleSheet, View } from 'react-native';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

import HomeScreenHeader from './HomeScreenHeader';

export default function HomeScreen() {
  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <HomeScreenHeader />
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
