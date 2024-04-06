import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

export default function CreateFeedModal({ navigation }) {
  return (
    <SafeAreaLayout>
      <Button title="close modal" onPress={navigation.goBack} />
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {},
});
