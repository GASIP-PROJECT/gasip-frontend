import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { COLORS } from '@styles/colors';

interface GSRadioButtonProps {
  isSelected: boolean;
  onPress: () => void;
}

export default function GSRadioButton({
  isSelected,
  onPress,
}: GSRadioButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.borderCircle,
        { borderColor: isSelected ? COLORS.BLUE_PRIMARY : '#636366' },
      ]}
      disabled={isSelected}
      onPress={onPress}
    >
      {isSelected && (
        <View
          style={[
            styles.innerFillCircle,
            { backgroundColor: isSelected ? COLORS.BLUE_PRIMARY : '#636366' },
          ]}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  borderCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerFillCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
