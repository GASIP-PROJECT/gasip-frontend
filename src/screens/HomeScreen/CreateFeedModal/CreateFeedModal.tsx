import React from 'react';
import { StyleSheet, View } from 'react-native';

import Spacer from '@components/common/Spacer';
import GSButton from '@components/common/GSButton';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import CreateFeedModalHeader from './CreateFeedModalHeader';
import CreateFeedModalPolicy from './CreateFeedModalPolicy';
import CreateFeedModalTextInput from './CreateFeedModalTextInput';

import { type CreateFeedModalProps } from '@screens/navigationTypes';

import { COLORS } from '@styles/colors';

export default function CreateFeedModal({ navigation }: CreateFeedModalProps) {
  const handleCreateFeedPress = () => {};

  return (
    <SafeAreaLayout backgroundColor={COLORS.BG_MAIN}>
      <View style={styles.container}>
        <CreateFeedModalHeader />
        <Spacer type="height" value={23} />
        <CreateFeedModalTextInput />
        <Spacer type="height" value={40} />
        <CreateFeedModalPolicy />
      </View>

      <GSButton buttonText="공유" onPress={handleCreateFeedPress} />
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
