import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [useremail, setUseremail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [timer, setTimer] = useState(180);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [verifiedEmail, setVerifiedEmail] = useState<string>('');
  const isSubmitEnabled = isValidPassword && passwordsMatch;

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const handleEmailChange = (text: string) => {
    setUseremail(text);
    setIsValidEmail(validateEmail(text));
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]{2,}$/;
    return emailPattern.test(email);
  };

  const [isValidCode, setIsValidCode] = useState(false);

  const validateCode = (code: string) => {
    const codePattern = /^\d{6}$/;
    return codePattern.test(code);
  };

  const handleCodeChange = (text: string) => {
    setIsValidCode(validateCode(text));
    if (validateCode(text)) {
      setVerificationCode(text);
    }
  };

  const handlePasswordChange = (text: any) => {
    setPassword(text);
    validatePassword(text);
  };

  const handleConfirmPasswordChange = (text: any) => {
    setConfirmPassword(text);
    validatePasswordMatch(password, text);
  };

  const validatePassword = (password: string) => {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    setIsValidPassword(passwordPattern.test(password));
  };

  const validatePasswordMatch = (password: string, confirmPassword: string) => {
    setPasswordsMatch(password === confirmPassword);
  };

  const doPasswordsMatch = password === confirmPassword;

  const handleSubmitNewPw = async () => {
    try {
      const url = 'https://gasip.site/members/passwords/noauth';
      const requestData = JSON.stringify({
        email: verifiedEmail, // 인증받은 이메일
        code: verificationCode, // 인증코드
        newPassword: password, // 새 비밀번호
      });

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestData,
      });

      if (response.ok) {
        Alert.alert(
          '비밀번호 재설정 성공',
          '새로운 비밀번호로 로그인해주세요.',
        );
      } else {
        throw new Error('비밀번호 재설정 실패');
      }
    } catch (error: any) {
      console.error('비밀번호 재설정 실패:', error.message);
      Alert.alert(
        '비밀번호 재설정 실패',
        '비밀번호를 재설정할 수 없습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  };

  return (
    <SafeAreaLayout>
      <Spacer type="height" value={10} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              source={require('@assets/chevron-left.png')}
              style={styles.left}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <GSText style={styles.headerText}>비밀번호 재설정하기</GSText>
          </View>
          <View style={{ height: 28, width: 28 }} />
        </View>

        <Spacer type="height" value={35} />

        <GSText style={styles.subText2}>새 비밀번호</GSText>

        <Spacer type="height" value={8} />

        <View
          style={[
            {
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 26,
              // borderColor: isPasswordValid
              //   ? COLORS.BLUE_PRIMARY
              //   : COLORS.GRAY_400,
            },
            styles.input,
          ]}
        >
          {/* <Image
            source={require('@assets/lock.png')}
            style={{ tintColor: COLORS.GRAY_400 }}
          /> */}
          <Spacer type="width" value={6} />
          <TextInput
            style={{ flex: 1, color: COLORS.BLACK }}
            placeholder="새로운 비밀번호로 재설정해주세요."
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
          />
        </View>
        <Spacer type="height" value={10} />

        <GSText style={[styles.errorMessage, { color: COLORS.GRAY_400 }]}>
          영문, 숫자, 특수문자를 사용해 8~20자리를 입력해주세요
        </GSText>

        <Spacer type="height" value={20} />

        <GSText style={styles.subText2}>비밀번호 재입력</GSText>

        <Spacer type="height" value={8} />
        <View
          style={[
            {
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 26,
              // borderColor: isPasswordValid
              //   ? COLORS.BLUE_PRIMARY
              //   : COLORS.GRAY_400,
            },
            styles.input,
          ]}
        >
          {/* <Image
            source={require('@assets/lock.png')}
            style={{ tintColor: COLORS.GRAY_400 }}
          /> */}
          <Spacer type="width" value={6} />
          <TextInput
            style={{ flex: 1, color: COLORS.BLACK }}
            placeholder="비밀번호를 재입력해주세요"
            secureTextEntry={true}
            onChangeText={handleConfirmPasswordChange}
          />
        </View>

        {!passwordsMatch && (
          <GSText style={styles.errorMessage}>
            비밀번호가 일치하지 않습니다.
          </GSText>
        )}

        <Spacer type="height" value={76} />

        <TouchableOpacity
          disabled={!isSubmitEnabled} // 비밀번호 변경 버튼 활성화 여부
          onPress={handleSubmitNewPw}
          style={[
            styles.changePwButton,
            {
              backgroundColor: isSubmitEnabled
                ? COLORS.BLUE_PRIMARY
                : COLORS.WHITE,
            },
          ]}
        >
          <GSText
            style={[
              isSubmitEnabled ? styles.activeButtonCP : styles.inactiveButtonCP,
            ]}
            onPress={handleSubmitNewPw}
          >
            확인
          </GSText>
        </TouchableOpacity>
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F9',
    paddingHorizontal: 32,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  pageContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },

  input: {
    height: 55,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  inputName: {
    height: 55,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  header: {
    color: 'white',
    fontSize: 24,
    alignItems: 'center',
  },

  headerText: {
    color: '#111111',
    fontSize: 20,
    position: 'relative',
  },

  stepText: {
    marginTop: -50,
  },

  changePwButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderStyle: 'solid',
    borderColor: '#9EA4AA',
    borderWidth: 1,
    borderRadius: 16,
    textAlign: 'center',
    alignItems: 'center',
  },

  activeButtonCP: {
    backgroundColor: '#007AFF',
    color: '#fff',
  },

  inactiveButtonCP: {},

  activeMail: {
    tintColor: '#007AFF',
  },

  subText4: {},

  subText5: {},

  inactiveMail: {
    tintColor: '#9EA4AA',
  },

  activeBorder: {
    borderColor: '#007AFF',
  },

  inactiveBorder: {
    borderColor: '#9EA4AA',
  },

  pwText: {},

  pwText2: {},

  left: {},

  smallText: {
    position: 'relative',
    right: 0,
    marginTop: 10,
    fontSize: 12,
    color: '#9EA4AA',
  },

  subText: {
    position: 'relative',
    right: 140,
    fontSize: 14,
    color: '#72787F',
    marginBottom: 10,
    marginTop: 50,
  },

  subText2: {
    fontSize: 14,
    fontWeight: '400',
    color: '#72787F',
    marginLeft: 10,
  },

  subText3: {
    fontSize: 30,
    color: 'white',
  },

  warning: {
    color: '#4490D8',
    fontSize: 14,
    marginLeft: 8,
  },
  errorMessage: {
    fontSize: 12,
    marginLeft: 8,
    fontWeight: '400',
  },

  button: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderColor: '#9EA4AA',
    borderStyle: 'solid',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  activeButton: {
    backgroundColor: '#007AFF',
    borderStyle: 'solid',
    borderColor: '#9EA4AA',
  },

  inactiveButton: {
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderColor: '#9EA4AA',
    borderWidth: 1,
  },

  activeButtonText: {
    color: '#fff',
  },

  activeText: {
    color: '#ffffff',
  },

  inactiveText: {
    color: '#9EA4AA',
  },

  activeText2: {
    color: '#007AFF',
  },

  inactiveText2: {
    color: '#9EA4AA',
  },

  button2: {
    borderRadius: 16,
  },
  activeButton2: {
    backgroundColor: '#4490D8',
  },
  inactiveButton2: {
    backgroundColor: 'gray',
  },

  timerContainer: {
    marginTop: 20,
  },

  timerText: {
    color: '#9EA4AA',
    fontSize: 15,
    position: 'relative',
    bottom: 30,
    left: 150,
  },
  reNum: {
    color: '#4490D8',
    fontSize: 15,
    marginTop: 30,
    marginBottom: 0,
    textDecorationLine: 'underline',
    bottom: 15,
    position: 'relative',
    left: 120,
  },

  setName: {
    position: 'relative',
    top: 40,
    right: 152,
  },

  setNickName: {
    position: 'relative',
    top: 0,
    right: 146,
    marginBottom: 10,
  },
});
export default ResetPasswordScreen;
