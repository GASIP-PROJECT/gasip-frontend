import React from 'react';
import { Text } from 'react-native';

const defaultTextStyle = {
  color: 'black',
  fontSize: 16,
  fontWeight: 'normal',
  fontFamily: 'Pretendard',
};

export default function GSText({
  style,
  ...props
}: {
  style?: any;
  [key: string]: any;
}) {
  return <Text {...props} style={[defaultTextStyle, style]} />;
}
