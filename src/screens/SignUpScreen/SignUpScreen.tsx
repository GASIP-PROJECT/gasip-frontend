import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import EmailCodeBtn from '@components/common/EmailCodeBtn'; 
import LoginScreen from '@screens/LoginScreen/LoginScreen';

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
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
  
      return () => {
        clearInterval(countdown); // 타이머 중지
      };
    } else if (step === 2 && timer === 0) {
      setIsTimerRunning(false);
      Alert.alert('시간 초과', '인증 시간이 초과되었습니다. 다시 시도해주세요.');
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
      const defaultEmailSuffix = '@naver.com'; // 기본 이메일 도메인 나중에 @gachon.ac.kr 로 변경하기
      const userEmail = `${userEmailPrefix}${defaultEmailSuffix}`; 
      const response = await fetch(`https://gasip.site/members/emails/verification-requests?email=${encodeURIComponent(userEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });
  
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
      const url = `https://gasip.site/members/emails/verification-requests`;
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: verifiedEmail }) 
      });
  
      console.log(response);
  
      if (!response.ok) {
        throw new Error('새로운 인증번호 요청 실패');
      }
  
      startTimer(); 
    } catch (error: any) {
      console.error('새로운 인증번호 요청에 실패했습니다:', error.message);
      Alert.alert('새로운 인증번호 요청 실패', error.message);
    }
  };

const handlePasswordChange = (text : any) => {
  setPassword(text);
  validatePassword(text);
};

const handleConfirmPasswordChange = (text : any) => {
  setConfirmPassword(text);
  validatePasswordMatch(password, text);
};

const validatePassword = (password: string) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
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
      nickname: nickname
    };

    console.log(userData)

    const response = await fetch('https://gasip.site/members/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    console.log(response)

    if (response.ok) {
      // 회원가입 성공하면
      navigation.navigate('LoginScreen')
    } else {
      throw new Error('회원가입 실패');
    }
  } catch (error: any) {
    console.error('회원가입 요청에 실패했습니다:', error.message);
    Alert.alert('회원가입 실패', '회원가입에 실패했습니다. 다시 시도해주세요.');
  }
};

  return (
    <View style={styles.container}>
      {step === 1 && (
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Image
                source={require('@assets/chevron-left.png')}
                style={styles.left}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>이메일 회원가입 (1/3)</Text>
            <Text style={styles.emoji}>😄</Text>
            <Text style={styles.subText}>이메일을 입력해 주세요</Text>
          </View>

          <TextInput
            style={[styles.step1, { borderStyle: 'solid', borderWidth: 1, backgroundColor: 'white', borderRadius: 10, borderColor: '#ffffff' }]}
            placeholder="이메일"
            value={useremail}
            onChangeText={handleEmailChange}
          />
          <Text style={styles.emailText}>@gachon.ac.kr</Text>
          <Text style={styles.smallText} >본인 소유의 가천대학교 이메일 주소를 사용해 주세요</Text>

          <TouchableOpacity
            style={[styles.button, isValidEmail ? styles.activeButton : styles.inactiveButton]}
            onPress={handleButtonPress}
            disabled={!isValidEmail}
          >
            <Text style={styles.buttonText}>이메일 인증</Text>
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
          <Text style={styles.headerText}>이메일 회원가입 (1/3)</Text>
          <Text style={styles.emoji}>😄</Text>
          <Text style={styles.subText2}>인증번호를 입력해 주세요!</Text>
          <TextInput
            style={[styles.step2, { borderStyle: 'solid', borderWidth: 1, backgroundColor: 'white', borderRadius: 10, borderColor: '#ffffff' }]}
            placeholder="인증번호 6자리"
            onChangeText={handleCodeChange}
          />

          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.reNum}>인증번호 다시받기</Text>
          </TouchableOpacity>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}> {Math.floor(timer / 60)}분{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}초</Text>
          </View>
          <EmailCodeBtn
            style={[styles.button2, isValidCode ? styles.activeButton2 : styles.inactiveButton2]}
            onPress={handleSubmit}
            disabled={!isValidCode}
          >
            <Text style={styles.buttonText}>인증하기</Text>
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
        <Text style={styles.headerText}>이메일 회원가입 (2/3)</Text>
        <Text style={styles.emoji}>👋</Text>
        <Text style={styles.subText2}>비밀번호를 입력해 주세요!</Text>
     
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        secureTextEntry={true}
        onChangeText={handleConfirmPasswordChange}
      />

      {!isValidPassword && (
        <Text style={styles.errorMessage}>비밀번호는 8자~20자의 영문+숫자+특수문자 공백X 조합이어야 합니다.</Text>
      )}

      {!passwordsMatch && (
        <Text style={styles.errorMessage}>비밀번호가 일치하지 않습니다.</Text>
      )}

      <TouchableOpacity
        style={[styles.buttonPass, isNextButtonEnabled ? styles.activeButton : styles.inactiveButton]}
        disabled={!isNextButtonEnabled}
        onPress={nextStep}
      >
        <Text style={styles.buttonText}>다음</Text>
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
            <Text style={styles.headerText}>이메일 회원가입 (3/3)</Text>
            <Text style={styles.emoji}>✈️</Text>
            <Text style={styles.subText3}>다 왔어요!</Text>

            <TextInput
             style={[styles.inputName, { borderStyle: 'solid', borderWidth: 1, backgroundColor: 'white', borderRadius: 10, borderColor: '#ffffff' }]}
             placeholder="이름"
             value={name}
             onChangeText={handleNameChange}
            />
            <TextInput
             style={[styles.inputName, { borderStyle: 'solid', borderWidth: 1, backgroundColor: 'white', borderRadius: 10, borderColor: '#ffffff' }]}
             placeholder="닉네임 2~12자"
             value={nickname}
             onChangeText={handleNicknameChange}
            />
            {!isNicknameValid && <Text style={styles.warning}>2~12자 사이의 영문 또는 숫자만 입력하세요.</Text>}
    

            <TouchableOpacity
            style={[styles.button3, (isNameValid && isNicknameValid) ? styles.activeButton3 : styles.inactiveButton3]} // 활성화 여부에 따라 스타일 변경
            onPress={handleSubmitFinish}
            disabled={!isNameValid || !isNicknameValid} 
          >
            <Text style={styles.buttonText}>회원가입 완료</Text>
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
    backgroundColor: '#4B5159',
    paddingTop: 35,
    
  },
  input: {
    width: 350,
    height: 55,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
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
    fontSize: 25,
    alignItems: 'center',
    paddingTop: 0,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    position: 'relative',
    top: -30,
    marginBottom: 40,
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
  step1: {
    fontSize: 15,
    right: 35,
    width: 180,
  },

  step2: {
    fontSize: 15,
    width: 360,
    alignItems: 'center',
  },

  left: {
    position: 'relative',
    right: 160,
    width: 150,
  },
  emoji: {
    fontSize: 60,
    right: 150,
    marginBottom: 10,
  },
  smallText: {
    position: 'relative',
    right: 35,
    marginTop: 0,
    color: '#4490D8',
  },
  subText: {
    position: 'relative',
    right: 40,
    fontSize: 30,
    color: 'white',
    marginBottom: 30,
  },

  subText2: {
    position: 'relative',
    right: 15,
    fontSize: 30,
    color: 'white',
    marginBottom: 30,
  },

  subText3: {
    position: 'relative',
    right: 110,
    fontSize: 30,
    color: 'white',
    marginBottom: 30,
  },

  emailText: {
    color: 'white',
    fontSize: 20,
    position: 'relative',
    bottom: 40,
    left: 165,
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
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },

  buttonPass: {
    width: 350,
    marginTop: 50,
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#4490D8', 
  },
  inactiveButton: {
    backgroundColor: 'gray', 
  },

  button2: {
    marginTop: 50,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
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
    padding: 10,
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
  timerContainer: {
    marginTop: 20,
  },
  timerText: {
    color: '#4490D8',
    fontSize: 15,
    position: 'relative',
    left: 140,
  },
  reNum: {
    color: '#4490D8',
    fontSize: 15,
    marginTop: 30,
    marginBottom: -40,
    textDecorationLine: 'underline',
    position: 'relative',
    right: 120,
  },
});

export default SignUpScreen;
