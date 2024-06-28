import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';

import { COLORS } from '@styles/colors';

import icon_mail from '@assets/icon_mail.png';

interface InputEmailScreenProps {
  emailToVerifyCode: string;
  setEmailToVerifyCode: Dispatch<SetStateAction<string>>;
  setIsWaitingForCodeVerification: Dispatch<SetStateAction<boolean>>;
}

export default function InputEmailScreen({
  emailToVerifyCode,
  setEmailToVerifyCode,
  setIsWaitingForCodeVerification,
}: InputEmailScreenProps) {
  const [isSendEmailRequestProcessing, setIsSendEmailRequestProcessing] =
    useState(false);

  const handleEmailChange = (text: string) => {
    setEmailToVerifyCode(text);
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]{2,}$/;
    return emailPattern.test(email);
  };

  // TODO - 프로덕션 시 validateEmail 함수 실행하는 형태로 변경
  // const isValidEmail = validateEmail(emailToVerifyCode);
  const isValidEmail = true;

  const handleVerifyEmailPress = async () => {
    try {
      const userEmailPrefix = emailToVerifyCode;
      const defaultEmailSuffix = '@nweal.com'; // 기본 이메일 도메인 나중에 @gachon.ac.kr 로 변경하기

      // TODO - 테스트용으로 우선 입력한 이메일을 전체 이메일로 처리
      // const userEmail = `${userEmailPrefix}${defaultEmailSuffix}`;
      setIsSendEmailRequestProcessing(true);
      // TODO - 테스트용으로 우선 입력한 이메일을 전체 이메일로 처리
      const response = await fetch(
        `https://gasip.site/members/emails/verification-requests?email=${encodeURIComponent(
          emailToVerifyCode,
        )}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailToVerifyCode,
          }),
        },
      );
      if (!response.ok) {
        throw new Error('이메일 인증 요청에 실패했습니다.');
      }
      console.log('요청 전송에 대한 response 받음');
      setIsWaitingForCodeVerification(true);
      setIsSendEmailRequestProcessing(false);
    } catch (error: any) {
      console.error('이메일 인증 요청에 실패했습니다:', error.message);
      Alert.alert('이메일 인증 요청 실패', error.message);
    }
  };

  return (
    <View>
      <GSText style={styles.inputLabelText}>이메일</GSText>
      <Spacer type="height" value={8} />
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: isValidEmail ? COLORS.BLUE_PRIMARY : COLORS.GRAY_400,
          },
        ]}
      >
        <Image
          source={icon_mail}
          tintColor={isValidEmail ? COLORS.BLUE_PRIMARY : COLORS.GRAY_400}
        />
        <Spacer type="width" value={2} />
        <TextInput
          style={{ height: 60, flex: 1, color: COLORS.BLACK }}
          placeholder=" 학교 아이디 입력"
          value={emailToVerifyCode}
          onChangeText={handleEmailChange}
        />
        <GSText style={styles.gachonEmailText}>@gachon.ac.kr</GSText>
      </View>

      <Spacer type="height" value={12} />

      <GSText
        style={[
          styles.informText,
          { color: isValidEmail ? COLORS.BLUE_PRIMARY : COLORS.GRAY_400 },
        ]}
      >
        본인 소유의 가천대학교 이메일 주소를 사용해 주세요
      </GSText>

      <Spacer type="height" value={64} />

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isValidEmail ? COLORS.BLUE_PRIMARY : COLORS.WHITE,
          },
        ]}
        onPress={handleVerifyEmailPress}
        disabled={!isValidEmail || isSendEmailRequestProcessing}
      >
        {isSendEmailRequestProcessing ? (
          <ActivityIndicator size={'small'} color={COLORS.WHITE} />
        ) : (
          <GSText
            style={[
              styles.buttonText,
              { color: isValidEmail ? COLORS.WHITE : COLORS.GRAY_400 },
            ]}
          >
            이메일 인증하기
          </GSText>
        )}
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
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  gachonEmailText: {
    fontSize: 16,
    fontWeight: '400',
  },
  informText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.GRAY_400,
  },
  button: {
    borderRadius: 16,
    borderColor: COLORS.GRAY_400,
    borderStyle: 'solid',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
