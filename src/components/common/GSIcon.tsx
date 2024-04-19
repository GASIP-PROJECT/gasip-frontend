import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS } from '@styles/colors';

export default function GSIcon({
  iconName,
  iconSize = 27,
  iconColor = COLORS.WHITE,
}: {
  iconName: string;
  iconSize?: number;
  iconColor?: string;
}) {
  return <Icon name={iconName} size={iconSize} style={{ color: iconColor }} />;
}
