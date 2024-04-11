import React from 'react';
import { StyleSheet, View } from 'react-native';

import SettingsElements from './SettingsElements';
import SettingsScreenHeader from './SettingsScreenHeader';

import Spacer from '@components/common/Spacer';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

export default function SettingsScreen() {
  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <SettingsScreenHeader />
        <Spacer type="height" value={20} />
        <SettingsElements />
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
