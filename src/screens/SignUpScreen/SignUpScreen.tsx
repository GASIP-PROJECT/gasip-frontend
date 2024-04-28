import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';
import GSHeader from '@components/common/GSHeader';
import EmailCodeBtn from '@components/common/EmailCodeBtn';
import SafeAreaLayout from '@components/common/SafeAreaLayout';
import GSButton from '@components/common/GSButton';

const SignUpScreen = () => {
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
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string>('');

  useEffect(() => {
    if (step === 2 && isTimerRunning && timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(countdown); // 타이머 중지
      };
    } else if (step === 2 && timer === 0) {
      setIsTimerRunning(false);
      Alert.alert(
        '시간 초과',
        '인증 시간이 초과되었습니다. 다시 시도해주세요.',
      );
    }
  }, [step, timer, isTimerRunning]);

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

  const handleButtonPress = async () => {
    try {
      const userEmailPrefix = useremail;
      const defaultEmailSuffix = '@hanmail.net'; // 기본 이메일 도메인 나중에 @gachon.ac.kr 로 변경하기
      // const userEmail = `${userEmailPrefix}${defaultEmailSuffix}`;
      // TODO - 테스트용으로 이메일 전체 주소말고 앞단에 입력하는 값으로 처리하도록 설정
      const userEmail = `${userEmailPrefix}`;
      const response = await fetch(
        `https://gasip.site/members/emails/verification-requests?email=${encodeURIComponent(
          userEmail,
        )}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        },
      );

      console.log(userEmail);

      if (!response.ok) {
        throw new Error('이메일 인증 요청에 실패했습니다.');
      }

      setVerifiedEmail(userEmail);

      startTimer();
      setStep(2);
    } catch (error: any) {
      console.error('이메일 인증 요청에 실패했습니다:', error.message);
      Alert.alert('이메일 인증 요청 실패', error.message);
    }
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

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const url = `https://gasip.site/members/emails/verifications?email=${verifiedEmail}&code=${verificationCode}`;

      console.log(url);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setStep(3);
      } else {
        throw new Error('인증 실패');
      }
    } catch (error: any) {
      console.error('인증 요청에 실패했습니다:', error.message);
      Alert.alert('인증 실패', '인증에 실패했습니다. 인증번호를 확인해주세요.');
    }
  };

  const handleResendCode = async () => {
    try {
      const url = `https://gasip.site/members/emails/verification-requests?email=${verifiedEmail}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(await response.json());

      setTimer(180);

      if (!response.ok) {
        throw new Error('새로운 인증번호 요청 실패');
      }

      startTimer();
    } catch (error: any) {
      console.error('새로운 인증번호 요청에 실패했습니다:', error.message);
      Alert.alert('새로운 인증번호 요청 실패', error.message);
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

  const isNextButtonEnabled = isValidPassword && passwordsMatch;

  const nextStep = () => {
    setStep(step + 1); // 다음 단계로 이동
  };

  const handleNameChange = (text: string) => {
    setName(text);
    setIsNameValid(validateName(text));
  };

  const validateName = (name: string) => {
    const namePattern = /^[a-zA-Z가-힣]{2,}$/;
    return namePattern.test(name);
  };

  const handleNicknameChange = (text: string) => {
    setNickname(text);
    setIsNicknameValid(validateNickname(text));
  };

  const validateNickname = (nickname: string) => {
    const nicknamePattern = /^[a-zA-Z0-9가-힣]{2,12}$/;
    return nicknamePattern.test(nickname);
  };

  const handleNextStepFinish = () => {
    if (isNameValid && isNicknameValid) {
      setStep(step + 1);
    }
  };

  const handleSubmitFinish = async () => {
    try {
      const userData = {
        email: verifiedEmail,
        password: password,
        name: name,
        nickname: nickname,
      };

      console.log(userData);

      const response = await fetch('https://gasip.site/members/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log(response);

      if (response.ok) {
        // 회원가입 성공하면
        navigation.navigate('LoginScreen');
      } else {
        throw new Error('회원가입 실패');
      }
    } catch (error: any) {
      console.error('회원가입 요청에 실패했습니다:', error.message);
      Alert.alert(
        '회원가입 실패',
        '회원가입에 실패했습니다. 다시 시도해주세요.',
      );
    }
  };

  return (
    <SafeAreaLayout backgroundColor="#4B5159">
      <View style={styles.container}>
        {step === 1 && (
          <>
            <GSHeader
              title="이메일 회원가입 (1/3)"
              leftComponent={<GSIcon name="chevron-back-outline" />}
              onLeftComponentPress={() => navigation.goBack()}
            />
            <Spacer type="height" value={20} />
            <View style={styles.pageContainer}>
              <Text style={styles.emoji}>😄</Text>
              <Text style={styles.subText}>이메일을 입력해 주세요</Text>
              <Spacer type="height" value={20} />

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={[
                    styles.step1,
                    {
                      borderStyle: 'solid',
                      borderWidth: 1,
                      backgroundColor: 'white',
                      borderRadius: 5,
                      borderColor: '#ffffff',
                      height: 50,
                      flex: 1,
                      paddingHorizontal: 10,
                    },
                  ]}
                  placeholder="이메일"
                  value={useremail}
                  onChangeText={handleEmailChange}
                />
                <Spacer type="width" value={10} />
                <Text style={styles.emailText}>@ gachon.ac.kr</Text>
              </View>
              <Spacer type="height" value={10} />
              <Text style={styles.smallText}>
                본인 소유의 가천대학교 이메일 주소를 사용해 주세요
              </Text>

              <Spacer type="height" value={50} />

              <GSButton
                buttonText="이메일 인증"
                onPress={handleButtonPress}
                disabled={!isValidEmail}
                marginHorizontal={0}
              />
            </View>
          </>
        )}

        {step === 2 && (
          <>
            <GSHeader
              title="이메일 회원가입 (2/3)"
              leftComponent={<GSIcon name="chevron-back-outline" />}
              onLeftComponentPress={() => setStep(prevStep => prevStep - 1)}
            />
            <Spacer type="height" value={20} />
            <View style={styles.pageContainer}>
              <Text style={styles.emoji}>😄</Text>
              <Text style={styles.subText}>이메일을 입력해 주세요</Text>
              <Spacer type="height" value={20} />

              <TextInput
                style={[
                  styles.step2,
                  {
                    borderStyle: 'solid',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    borderColor: '#ffffff',
                    height: 50,
                    paddingHorizontal: 10,
                  },
                ]}
                placeholder="인증번호 6자리"
                onChangeText={handleCodeChange}
              />

              <Spacer type="height" value={10} />

              <TouchableOpacity onPress={handleResendCode}>
                <Text style={styles.reNum}>인증번호 다시받기</Text>
              </TouchableOpacity>
              <Spacer type="height" value={10} />
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>
                  {' '}
                  {Math.floor(timer / 60)}분
                  {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}초
                </Text>
              </View>

              <Spacer type="height" value={20} />

              <GSButton
                buttonText="인증하기"
                onPress={handleSubmit}
                disabled={!isValidCode}
                marginHorizontal={0}
              />
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <GSHeader
              title="이메일 회원가입 (3/3)"
              leftComponent={<GSIcon name="chevron-back-outline" />}
              onLeftComponentPress={() => setStep(prevStep => prevStep - 1)}
            />
            <Spacer type="height" value={20} />
            <View style={styles.pageContainer}>
              <Text style={styles.emoji}>👋</Text>
              <Text style={styles.subText2}>비밀번호를 입력해 주세요!</Text>

              <Spacer type="height" value={20} />

              <TextInput
                style={styles.input}
                placeholder="비밀번호"
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
              />

              <Spacer type="height" value={10} />

              {!isValidPassword && (
                <Text style={styles.errorMessage}>
                  비밀번호는 8자~20자의 영문+숫자+특수문자 공백X 조합이어야
                  합니다.
                </Text>
              )}

              <Spacer type="height" value={25} />

              <TextInput
                style={styles.input}
                placeholder="비밀번호 확인"
                secureTextEntry={true}
                onChangeText={handleConfirmPasswordChange}
              />

              <Spacer type="height" value={10} />

              {!passwordsMatch && (
                <Text style={styles.errorMessage}>
                  비밀번호가 일치하지 않습니다.
                </Text>
              )}

              <Spacer type="height" value={30} />

              <GSButton
                buttonText="다음"
                onPress={nextStep}
                disabled={!isNextButtonEnabled}
                marginHorizontal={0}
              />
            </View>
          </>
        )}

        {step === 4 && (
          <>
            <GSHeader
              title="이메일 회원가입 (3/3)"
              leftComponent={<GSIcon name="chevron-back-outline" />}
              onLeftComponentPress={() => setStep(prevStep => prevStep - 1)}
            />
            <Spacer type="height" value={20} />
            <View style={styles.pageContainer}>
              <Text style={styles.emoji}>✈️</Text>
              <Text style={styles.subText3}>다 왔어요!</Text>

              <Spacer type="height" value={20} />

              <TextInput
                style={styles.input}
                placeholder="이름"
                value={name}
                onChangeText={handleNameChange}
              />

              <Spacer type="height" value={15} />

              <TextInput
                style={styles.input}
                placeholder="닉네임 2~12자"
                value={nickname}
                onChangeText={handleNicknameChange}
              />
              <Spacer type="height" value={10} />
              {!isNicknameValid && (
                <Text style={styles.warning}>
                  2~12자 사이의 영문 또는 숫자만 입력하세요.
                </Text>
              )}

              <Spacer type="height" value={50} />

              <GSButton
                buttonText="회원가입 완료"
                onPress={handleSubmitFinish}
                disabled={!isNameValid || !isNicknameValid}
                marginHorizontal={0}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  pageContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#ffffff',
    height: 50,
    paddingHorizontal: 10,
  },

  inputName: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  header: {
    color: 'white',
    fontSize: 24,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  emailBtn: {
    fontSize: 20,
    backgroundColor: 'rgba(115, 120, 130, 0.15)',
    color: '#BCC0C6',
    borderRadius: 10,
    textAlign: 'center',
  },
  step1: {
    fontSize: 15,
  },

  step2: {
    fontSize: 15,
    alignItems: 'center',
  },

  left: {},
  emoji: {
    fontSize: 60,
  },
  smallText: {
    color: '#4490D8',
  },
  subText: {
    fontSize: 30,
    color: 'white',
  },

  subText2: {
    fontSize: 30,
    color: 'white',
  },

  subText3: {
    fontSize: 30,
    color: 'white',
  },

  emailText: {
    color: 'white',
    fontSize: 20,
  },

  warning: {
    color: '#4490D8',
    fontSize: 14,
  },

  errorMessage: {
    color: '#4490D8',
  },

  button: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },

  buttonPass: {
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#4490D8',
  },
  inactiveButton: {
    backgroundColor: 'gray',
  },

  button2: {
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  activeButton2: {
    backgroundColor: '#4490D8',
  },
  inactiveButton2: {
    backgroundColor: 'gray',
  },

  button3: {
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  activeButton3: {
    backgroundColor: '#4490D8',
  },
  inactiveButton3: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  timerContainer: {},
  timerText: {
    color: '#4490D8',
    fontSize: 15,
  },
  reNum: {
    color: '#4490D8',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
