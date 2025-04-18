import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
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

const defaultEmailSuffix = '@gachon.ac.kr';

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

  const isValidEmail = validateEmail(emailToVerifyCode);

  const handleVerifyEmailPress = async () => {
    try {
      const userEmailPrefix = emailToVerifyCode;
      // 기본 도메인 - 가천대학교 학교 전용 이메일 도메인
      const emailToVerify = `${userEmailPrefix}${defaultEmailSuffix}`;

      setIsSendEmailRequestProcessing(true);

      const response = await fetch(
        `https://gasip.site/members/emails/verification-requests?email=${encodeURIComponent(
          emailToVerify,
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

      // 이메일 값 수정
      setEmailToVerifyCode(emailToVerifyCode + defaultEmailSuffix);

      setIsWaitingForCodeVerification(true);
      setIsSendEmailRequestProcessing(false);
    } catch (error: any) {
      console.error('이메일 인증 요청에 실패했습니다:', error.message);
      setIsSendEmailRequestProcessing(false);
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

      <Spacer type="height" value={8} />

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://stirring-stranger-d22.notion.site/Gasip-127f32cc6a464aa8b2d541b685b0dbe7',
            );
          }}
        >
          <GSText
            style={{ ...styles.informText, textDecorationLine: 'underline' }}
          >
            서비스 이용약관
          </GSText>
        </TouchableOpacity>
        <GSText style={styles.informText}>
          {' '}
          내용을 확인했으며, 동의한 것으로 간주합니다.
        </GSText>
      </View>
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
