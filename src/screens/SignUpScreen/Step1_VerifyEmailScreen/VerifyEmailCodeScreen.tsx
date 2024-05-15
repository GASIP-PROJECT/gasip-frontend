import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';

interface VerifyEmailCodeScreenProps {
  emailToVerifyCode: string;
}

export default function VerifyEmailCodeScreen({
  emailToVerifyCode,
}: VerifyEmailCodeScreenProps) {
  const navigation = useNavigation();

  const [verificationCode, setVerificationCode] = useState<string>('');
  const [remainingTime, setRemainingTime] = useState<number>(180);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  const isValidCode = verificationCode.length === 6;

  const handleCodeChange = (text: string) => {
    setVerificationCode(text);
  };

  const handleResendCodePress = async () => {
    try {
      resetTimer();
      const url = `https://gasip.site/members/emails/verification-requests?email=${emailToVerifyCode}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(response.formData);
      console.log(await response.json());
      if (!response.ok) {
        throw new Error('새로운 인증번호 요청 실패');
      }
    } catch (error: any) {
      console.error('새로운 인증번호 요청에 실패했습니다:', error.message);
      Alert.alert('새로운 인증번호 요청 실패', error.message);
    }
  };

  const handleConfirmPress = async () => {
    navigation.replace('SignIn_Step2');
    // try {
    //   const url = `https://gasip.site/members/emails/verifications?email=${verifiedEmail}&code=${verificationCode}`;
    //   console.log(url);
    //   const response = await fetch(url.toString(), {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   if (response.ok) {
    // navigation.replace('SignIn_Step2');
    //   } else {
    //     throw new Error('인증 실패');
    //   }
    // } catch (error: any) {
    //   console.error('인증 요청에 실패했습니다:', error.message);
    //   Alert.alert('인증 실패', '인증에 실패했습니다. 인증번호를 확인해주세요.');
    // }
  };

  const getRemainingTimeText = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds =
      remainingTime % 60 < 10
        ? `0${remainingTime % 60}`
        : `${remainingTime % 60}`;
    return `${minutes}분 ${seconds}초`;
  };

  // Function to stop the timer
  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  // Function to reset the timer to 180 seconds
  const resetTimer = () => {
    setRemainingTime(180);
    setIsTimerRunning(true);
  };

  const alertTimeExpired = () => {
    Alert.alert('시간 초과', '인증 시간이 초과되었습니다. 다시 시도해주세요.');
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setRemainingTime(prev => {
          if (prev === 0) {
            stopTimer();
            alertTimeExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Update every second
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  return (
    <View>
      <GSText style={styles.inputLabelText}>인증번호</GSText>
      <Spacer type="height" value={8} />
      <TextInput
        style={[
          styles.input,
          { borderColor: isValidCode ? COLORS.BLUE_PRIMARY : COLORS.GRAY_400 },
        ]}
        placeholder=" 인증번호 6자리를 입력해주세요"
        onChangeText={handleCodeChange}
        maxLength={6}
        keyboardType="numeric"
      />
      <Spacer type="height" value={12} />

      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <View />
        <View style={{ justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={handleResendCodePress}>
            <Text style={styles.resendCodeText}>인증번호 다시받기</Text>
          </TouchableOpacity>
          <Spacer type="height" value={6} />
          <View style={styles.timerContainer}>
            <GSText style={styles.timerText}> {getRemainingTimeText()}</GSText>
          </View>
        </View>
      </View>
      <Spacer type="height" value={42} />

      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor: isValidCode ? COLORS.BLUE_PRIMARY : COLORS.WHITE,
            borderWidth: isValidCode ? 0 : 1,
          },
        ]}
        disabled={!isValidCode}
        onPress={handleConfirmPress}
      >
        <GSText
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: isValidCode ? COLORS.WHITE : COLORS.GRAY_400,
          }}
        >
          확인
        </GSText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabelText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.GRAY_500,
    marginLeft: 8,
  },
  input: {
    height: 60,
    paddingHorizontal: 24,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  resendCodeText: {
    color: COLORS.BLUE_PRIMARY,
    fontSize: 12,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  timerContainer: {
    alignSelf: 'flex-end',
  },
  timerText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.GRAY_400,
    fontVariant: ['tabular-nums'],
  },
  buttonContainer: {
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.GRAY_400,
    shadowColor: COLORS.BLUE_LIGHT_100,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
