import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@styles/colors';
import Spacer from '@components/common/Spacer';

export default function ProfessorInfo({
  profName,
  majorName,
}: {
  profName: string;
  majorName: string;
}) {
  return (
    <View>
      <Text style={styles.majorName}>{majorName}</Text>
      <Spacer type="height" value={10} />
      <Text style={styles.profName}>{profName} 교수님</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  majorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999999',
  },
  profName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
});
