import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import GSText from './GSText';

import { COLORS } from '@styles/colors';

interface GSButtonProps {
  buttonText: string;
  onPress: () => void | Promise<void> | null;
  bgColor?: string;
  btnTextColor?: string;
  marginHorizontal?: number;
  disabled?: boolean;
  height?: number;
  fontSize?: number;
}

// 태헌님 이 공통으로 사용할 버튼 컴포넌트입니다.
// 컴포넌트에 표시될 텍스트와, 눌렀을 때 실행될 함수를 전달해서 구현하면 됩니다.
// ex) <GSButton buttonText="Gasip 로그인" onPress={handleLogin} />
export default function GSButton({
  buttonText,
  onPress,
  bgColor = COLORS.BLUE_PRIMARY,
  btnTextColor = COLORS.WHITE,
  marginHorizontal = 16,
  disabled = false,
  height = 52,
  fontSize = 14,
}: GSButtonProps) {
  return (
    <TouchableOpacity
<<<<<<< HEAD
      style={[styles.container, { marginHorizontal: 0 }]}
=======
      style={[
        styles.container,
        styles.buttonElevation,
        styles.buttonShadow,
        {
          marginHorizontal: marginHorizontal,
          backgroundColor: disabled ? 'gray' : bgColor,
          height: height,
        },
      ]}
>>>>>>> 04b925ef688c6bc9261415a45124c05626cb1329
      onPress={onPress}
      disabled={disabled}
    >
      <GSText
        style={[styles.text, { color: btnTextColor, fontSize: fontSize }]}
      >
        {buttonText}
      </GSText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
<<<<<<< HEAD
    height: 60,
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: COLORS.BTN_MAIN,
=======
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  buttonShadow: {
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonElevation: {
    elevation: 5,
    elevationColor: COLORS.BLACK,
>>>>>>> 04b925ef688c6bc9261415a45124c05626cb1329
  },
  text: {
    fontWeight: '700',
  },
});
