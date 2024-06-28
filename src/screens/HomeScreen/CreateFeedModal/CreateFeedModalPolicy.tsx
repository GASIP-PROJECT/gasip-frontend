import React from 'react';
import { StyleSheet, View } from 'react-native';

import GSText from '@components/common/GSText';

export default function CreateFeedModalPolicy() {
  return (
    <View style={styles.container}>
      <GSText>정책</GSText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: 'gray',
    marginBottom: 10,
    borderRadius: 10,
    width: '90%',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
