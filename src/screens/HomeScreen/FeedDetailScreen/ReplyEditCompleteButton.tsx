import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import GSText from '@components/common/GSText';

import { COLORS } from '@styles/colors';

export default function ReplyEditCompleteButton({
  onPress,
}: {
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <GSText style={styles.buttonText}>완료</GSText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    backgroundColor: COLORS.BLUE_PRIMARY,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontWeight: '600',
  },
});
