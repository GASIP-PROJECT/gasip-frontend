import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  type: 'height' | 'width';
  value: number;
}

// 컴포넌트 간 간격을 주고 싶을 때 사용할 수 있는 컴포넌트 입니다.

// type 값은 세로 간격인지, 가로 간격인지를 의미합니다.
// height - 세로 간격, width - 가로 간격
// value 에 간격값을 전달해서 사용하시면 됩니다.
// ex) <Spacer type='height' value={10} /> -> 10만큼의 높이를 가지는 간격
export default function Spacer({ type, value }: SpacerProps) {
  if (type === 'height') return <View style={{ height: value }} />;
  return <View style={{ width: value }} />;
}
