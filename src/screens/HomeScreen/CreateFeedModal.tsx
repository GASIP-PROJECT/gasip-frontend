import React from 'react';
import { Button, StyleSheet } from 'react-native';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { type CreateFeedModalProps } from '@screens/navigationTypes';

export default function CreateFeedModal({ navigation }: CreateFeedModalProps) {
  return (
    <SafeAreaLayout>
      <Button title="close modal" onPress={navigation.goBack} />
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {},
});
