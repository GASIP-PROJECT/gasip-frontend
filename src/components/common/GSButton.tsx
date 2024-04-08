import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { COLORS } from '@styles/colors';

interface GSButtonProps {
  onPress: () => void | null;
}

export default function GSButton({ onPress }: GSButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { marginHorizontal: 16 }]}
      onPress={onPress}
    >
      <Text style={styles.text}>GSButton</Text>
    </TouchableOpacity>
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
    fontSize: 16,
    fontWeight: '500',
  },
});
