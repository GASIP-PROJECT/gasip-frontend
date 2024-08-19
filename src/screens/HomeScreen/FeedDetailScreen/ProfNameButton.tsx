import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import GSText from '@components/common/GSText';

import { COLORS } from '@styles/colors';

interface ProfNameButtonProps {
  name: string;
  onPress: () => void;
}

export default function ProfNameButton({ name, onPress }: ProfNameButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <GSText style={styles.professorNameText}>{name} 교수님</GSText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  professorNameText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.BLUE_PRIMARY,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});
