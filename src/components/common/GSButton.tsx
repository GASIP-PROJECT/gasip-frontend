import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

import { COLORS } from '@styles/colors';

interface GSButtonProps {
  buttonText: string;
  onPress: () => void | null;
}

export default function GSButton({ buttonText, onPress }: GSButtonProps) {
  return (
    <Pressable
      style={[styles.container, { marginHorizontal: 16 }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{buttonText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.BTN_MAIN,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: '700',
  },
});
