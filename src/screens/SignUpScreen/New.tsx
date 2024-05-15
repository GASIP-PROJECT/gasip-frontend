import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EmailCodeBtn from '@components/common/EmailCodeBtn';

export default function New() {
  return <View />;
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
    <View style={styles.container}>
      {step === 1 && (
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Image
                source={require('@assets/chevron-left.png')}
                style={styles.left}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>회원가입하기</Text>
            <Text style={styles.stepText}>1/3</Text>
            <Text style={styles.subText}>이메일</Text>
          </View>

          <View>
            <Image
              source={require('@assets/mail.png')}
              style={[
                styles.smallText,
                isValidEmail ? styles.activeMail : styles.inactiveMail,
              ]}
              resizeMode="contain"
            />
            <TextInput
              style={[
                styles.step1,
                isValidEmail ? styles.activeBorder : styles.inactiveBorder,
                {
                  borderStyle: 'solid',
                  borderWidth: 1,
                  backgroundColor: 'white',
                  borderRadius: 16,
                },
              ]}
              placeholder="학교 아이디를 입력해 주세요"
              value={useremail}
              onChangeText={handleEmailChange}
            />
          </View>
          <Text style={styles.gachon}>@gachon.ac.kr</Text>
          <Text
            style={[
              styles.smallText,
              isValidEmail ? styles.activeText2 : styles.inactiveText2,
            ]}
          >
            본인 소유의 가천대학교 이메일 주소를 사용해 주세요
          </Text>

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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setStep(prevStep => prevStep - 1)}>
            <Image
              source={require('@assets/chevron-left.png')}
              style={styles.left}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>회원가입하기</Text>
          <Text style={styles.stepText}>1/3</Text>
          <Text style={styles.subText2}>인증번호</Text>
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

          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.reNum}>인증번호 다시받기</Text>
          </TouchableOpacity>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {' '}
              {Math.floor(timer / 60)}분
              {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}초
            </Text>
          </View>
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
          <Text style={styles.stepText}>1/3</Text>

          <Text style={styles.pwText}>비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
          />
          {/* <Image
            source={require('')}
            style={styles.eyeclose}
            resizeMode="contain"
          /> */}
          <Text style={styles.pwText2}>비밀번호 재입력</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 재입력해주세요"
            secureTextEntry={true}
            onChangeText={handleConfirmPasswordChange}
          />
          {!isValidPassword && (
            <Text style={styles.errorMessage}>
              비밀번호는 8자~20자의 영문+숫자+특수문자 공백X 조합이어야 합니다.
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
            <Text style={styles.buttonText}>다음</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
