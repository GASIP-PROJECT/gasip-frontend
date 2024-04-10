import React from 'react';
import { Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

import { COLORS } from '@styles/colors';

interface GSButtonProps {
  buttonText: string;
  onPress: () => void | Promise<void> | null;
}

// 태헌님 이 공통으로 사용할 버튼 컴포넌트입니다.
// 컴포넌트에 표시될 텍스트와, 눌렀을 때 실행될 함수를 전달해서 구현하면 됩니다.
// ex) <GSButton buttonText="Gasip 로그인" onPress={handleLogin} />
export default function GSButton({ buttonText, onPress }: GSButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { marginHorizontal: 16 }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{buttonText}</Text>
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
    fontSize: 18,
    fontWeight: '700',
  },
});
