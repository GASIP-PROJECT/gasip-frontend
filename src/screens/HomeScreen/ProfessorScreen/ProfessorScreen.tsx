import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

export default function ProfessorDetailScreen() {
  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <Text>ProfessorDetailScreen</Text>
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
