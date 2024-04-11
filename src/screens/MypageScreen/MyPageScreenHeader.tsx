import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@styles/colors';

export default function MyPageScreenHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>마이페이지</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
});
