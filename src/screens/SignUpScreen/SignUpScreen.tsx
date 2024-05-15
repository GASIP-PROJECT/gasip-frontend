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
import EmailCodeBtn from '@components/common/EmailCodeBtn';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [useremail, setUseremail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [timer, setTimer] = useState(180);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
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
      const defaultEmailSuffix = '@nweal.com'; // 기본 이메일 도메인 나중에 @gachon.ac.kr 로 변경하기
      const userEmail = `${userEmailPrefix}${defaultEmailSuffix}`;
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
      // const url = `https://gasip.site/members/emails/verification-requests`;
      const url = `https://gasip.site/members/emails/verification-requests?email=${verifiedEmail}`;
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
    <SafeAreaLayout>
    <View style={styles.container}>
        <Spacer type="height" value={10} />
      {step === 1 && (
          <View style={{ width: '100%' }}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={navigation.goBack}>
              <Image
                source={require('@assets/chevron-left.png')}
                style={styles.left}
                resizeMode="contain"
              />
            </TouchableOpacity>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <GSText style={styles.headerText}>회원가입하기</GSText>
              </View>
              <View style={{ height: 28, width: 28 }} />
            </View>
            <Text style={styles.stepText}>1/3</Text>
            <Spacer type="height" value={28} />
            <GSText style={styles.subText}>이메일</GSText>
            <Spacer type="height" value={8} />
            <View
              style={[
                {
                  flexDirection: 'row',
                  borderWidth: 1,
                  backgroundColor: 'white',
                  borderRadius: 16,
                  alignItems: 'center',
                  paddingHorizontal: 20,
                },
                styles.step1,
                isValidEmail ? styles.activeBorder : styles.inactiveBorder,
              ]}
            >
              <Image
                source={require('@assets/mail.png')}
                style={[isValidEmail ? styles.activeMail : styles.inactiveMail]}
              />
              <Spacer type="width" value={2} />
              <TextInput
                style={{ height: 60, flex: 1 }}
                placeholder=" 학교 아이디 입력"
              value={useremail}
              onChangeText={handleEmailChange}
            />
              <GSText style={styles.gachon}>@gachon.ac.kr</GSText>
          </View>
            <Spacer type="height" value={12} />
            <GSText
            style={[
              styles.smallText,
              isValidEmail ? styles.activeText2 : styles.inactiveText2,
            ]}
          >
            본인 소유의 가천대학교 이메일 주소를 사용해 주세요
            </GSText>

            <Spacer type="height" value={64} />

          <TouchableOpacity
            style={[
              styles.button,
              isValidEmail ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={handleButtonPress}
            disabled={!isValidEmail}
          >
            <Text
              style={[
                styles.buttonText,
                isValidEmail ? styles.activeText : styles.inactiveText,
              ]}
            >
              이메일 인증하기
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
          <View style={{ width: '100%' }}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={() => setStep(prevStep => prevStep - 1)}
              >
            <Image
              source={require('@assets/chevron-left.png')}
              style={styles.left}
              resizeMode="contain"
            />
          </TouchableOpacity>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <GSText style={styles.headerText}>회원가입하기</GSText>
              </View>
              <View style={{ height: 28, width: 28 }} />
            </View>
          <Text style={styles.stepText}>1/3</Text>
            <Spacer type="height" value={28} />
          <Text style={styles.subText2}>인증번호</Text>
            <Spacer type="height" value={8} />
          <TextInput
            style={[
              styles.step2,
              isValidCode ? styles.activeBorder : styles.inactiveBorder,
              {
                height: 60,
                paddingLeft: 12,
                borderStyle: 'solid',
                borderWidth: 1,
                backgroundColor: 'white',
                borderRadius: 16,
              },
            ]}
            placeholder="인증번호 6자리를 입력해주세요"
            onChangeText={handleCodeChange}
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
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.reNum}>인증번호 다시받기</Text>
          </TouchableOpacity>
                <Spacer type="height" value={6} />
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {' '}
              {Math.floor(timer / 60)}분
              {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}초
            </Text>
          </View>
              </View>
            </View>
            <Spacer type="height" value={42} />

          <EmailCodeBtn
            style={[
              styles.button2,
              isValidCode ? styles.activeButton2 : styles.inactiveButton2,
            ]}
            onPress={handleSubmit}
            disabled={!isValidCode}
          >
            <Text
              style={[
                styles.buttonText,
                isValidCode ? styles.buttonText : styles.inactiveButtonText,
              ]}
            >
              확인
            </Text>
          </EmailCodeBtn>
        </View>
      )}

      {step === 3 && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setStep(prevStep => prevStep - 1)}>
            <Image
              source={require('@assets/chevron-left.png')}
              style={styles.left}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>회원가입하기</Text>
          <Text style={styles.stepText}>2/3</Text>

          <Text style={styles.pwText}>비밀번호</Text>
          <Image source={require('@assets/lock.png')} />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
          />

          <Text style={styles.pwText2}>비밀번호 재입력</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 재입력해주세요"
            secureTextEntry={true}
            onChangeText={handleConfirmPasswordChange}
          />
          {!isValidPassword && (
            <Text style={styles.errorMessage}>
              영문, 숫자, 특수문자를 사용해 8~20자리를 입력해주세요
            </Text>
          )}
          {!passwordsMatch && (
            <Text style={styles.errorMessage}>
              비밀번호가 일치하지 않습니다.
            </Text>
          )}
          <TouchableOpacity
            style={[
              styles.buttonPass,
              isNextButtonEnabled ? styles.activeButton : styles.inactiveButton,
            ]}
            disabled={!isNextButtonEnabled}
            onPress={nextStep}
          >
            <Text
              style={[
                styles.buttonText,
                isNextButtonEnabled
                  ? styles.activeButtonText
                  : styles.inactiveButtonText,
              ]}
            >
              확인
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 4 && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setStep(prevStep => prevStep - 1)}>
            <Image
              source={require('@assets/chevron-left.png')}
              style={styles.left}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>회원가입하기</Text>
          <Text style={styles.stepText}>3/3</Text>
          <Text style={styles.setName}>이름</Text>
          <TextInput
            style={[
              styles.inputName,
              {
                marginTop: 50,
                borderStyle: 'solid',
                borderWidth: 1,
                backgroundColor: '#fff',
                borderRadius: 16,
                borderColor: '#9EA4AA',
                marginBottom: 50,
              },
            ]}
            placeholder="이름을 입력해주세요"
            value={name}
            onChangeText={handleNameChange}
          />
          <Text style={styles.setNickName}>닉네임</Text>
          <TextInput
            style={[
              styles.inputName,
              {
                borderStyle: 'solid',
                borderWidth: 1,
                backgroundColor: 'white',
                borderRadius: 16,
                borderColor: '#9EA4AA',
              },
            ]}
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChangeText={handleNicknameChange}
          />
          {!isNicknameValid && (
            <Text style={styles.warning}>
              2~12자 사이의 영문 또는 숫자만 입력하세요.
            </Text>
          )}
          <TouchableOpacity
            style={[
              styles.button3,
              isNameValid && isNicknameValid
                ? styles.activeButton3
                : styles.inactiveButton3,
            ]} // 활성화 여부에 따라 스타일 변경
            onPress={handleSubmitFinish}
            disabled={!isNameValid || !isNicknameValid}
          >
            <Text
              style={[
                styles.buttonText,
                isNameValid && isNicknameValid
                  ? styles.activeButtonText3
                  : styles.inactiveButtonText3,
              ]}
            >
              회원가입 완료
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    paddingTop: 35,
  },

  pageContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },

  input: {
    width: 350,
    height: 55,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputName: {
    width: 350,
    height: 55,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  header: {
    color: 'white',
    fontSize: 24,
    alignItems: 'center',
    paddingTop: 0,
  },

  headerText: {
    color: '#111111',
    fontSize: 20,
    position: 'relative',
    top: -30,
    marginBottom: 40,
  },

  stepText: {
    marginTop: -50,
  },

  emailBtn: {
    marginTop: 130,
    fontSize: 20,
    backgroundColor: 'rgba(115, 120, 130, 0.15)',
    color: '#BCC0C6',
    borderRadius: 10,
    textAlign: 'center',
    padding: 10,
  },

  mailIcon: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },

  activeMail: {
    tintColor: '#007AFF',
  },

  inactiveMail: {
    tintColor: '#9EA4AA',
  },

  activeBorder: {
    borderColor: '#007AFF',
  },

  inactiveBorder: {
    borderColor: '#9EA4AA',
  },

  pwText: {
    position: 'relative',
    right: 140,
    marginBottom: 10,
    marginTop: 25,
  },

  pwText2: {
    position: 'relative',
    right: 118,
    marginBottom: 10,
    marginTop: 35,
  },

  step1: {
    fontSize: 14,
    right: 0,
    width: 326,
    height: 60,
  },

  step2: {
    fontSize: 15,
    width: 360,
    height: 60,
    alignItems: 'center',
  },

  left: {
    position: 'relative',
    right: 160,
    width: 150,
  },

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
    position: 'relative',
    right: 145,
    fontSize: 14,
    color: '#72787F',
    marginTop: 40,
    marginBottom: 10,
  },

  subText3: {
    position: 'relative',
    right: 110,
    fontSize: 30,
    color: 'white',
    marginBottom: 30,
  },

  warning: {
    color: '#4490D8',
    fontSize: 14,
    marginLeft: 10,
  },

  errorMessage: {
    color: '#4490D8',
    marginBottom: 10,
  },

  button: {
    marginTop: 50,
    backgroundColor: 'white',
    borderRadius: 16,
    borderColor: '#9EA4AA',
    borderStyle: 'solid',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  buttonPass: {
    width: 350,
    marginTop: 50,
    backgroundColor: '#fff',
    padding: 15,
    borderStyle: 'solid',
    borderColor: '#9EA4AA',
    borderRadius: 16,
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
    marginTop: 50,
    padding: 10,
    borderRadius: 16,
    width: 350,
  },
  activeButton2: {
    backgroundColor: '#4490D8',
  },
  inactiveButton2: {
    backgroundColor: 'gray',
  },

  button3: {
    width: 350,
    marginTop: 50,
    backgroundColor: 'gray',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },

  activeButton3: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },

  inactiveButton3: {
    borderColor: '#9EA4AA',
    backgroundColor: '#fff',
  },

  activeButtonText3: {
    color: '#fff',
  },

  buttonText: {
    color: '#9EA4AA',
    textAlign: 'center',
    fontSize: 18,
  },

  inactiveButtonText: {
    color: '#9EA4AA',
  },

  gachon: {
    position: 'absolute',
    top: '52.5%',
    left: '50%',
    color: '#000000',
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

export default SignUpScreen;
