import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function GSTopIndicator() {
  return <View style={styles.indicator} />;
}

const styles = StyleSheet.create({
  indicator: {
    width: 40,
    height: 4,
    borderRadius: 100,
    backgroundColor: '#DBDBDB',
    alignSelf: 'center',
  },
});
