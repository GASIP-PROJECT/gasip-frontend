import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { COLORS } from '@styles/colors';

interface GSButtonProps {
  buttonText: string;
  onPress: () => void | Promise<void> | null;
  bgColor?: string;
  btnTextColor?: string;
  marginHorizontal?: number;
}

// 태헌님 이 공통으로 사용할 버튼 컴포넌트입니다.
// 컴포넌트에 표시될 텍스트와, 눌렀을 때 실행될 함수를 전달해서 구현하면 됩니다.
// ex) <GSButton buttonText="Gasip 로그인" onPress={handleLogin} />
export default function GSButton({
  buttonText,
  onPress,
  bgColor = COLORS.BTN_MAIN,
  btnTextColor = COLORS.WHITE,
  marginHorizontal = 16,
}: GSButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { marginHorizontal: marginHorizontal, backgroundColor: bgColor },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: btnTextColor }]}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
});
