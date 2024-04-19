import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS } from '@styles/colors';

export default function GSIcon({
  name,
  size = 27,
  color = COLORS.WHITE,
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  return <Icon name={name} size={size} style={{ color: color }} />;
}
