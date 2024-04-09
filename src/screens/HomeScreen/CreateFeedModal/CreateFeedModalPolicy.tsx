import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CreateFeedModalPolicy() {
  return (
    <View style={styles.container}>
      <Text>정책</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: 'blue',
  },
});
