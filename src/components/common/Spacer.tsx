import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  type: 'height' | 'width';
  value: number;
}

export default function Spacer({ type, value }: SpacerProps) {
  if (type === 'height') return <View style={{ height: value }} />;
  return <View style={{ width: value }} />;
}
