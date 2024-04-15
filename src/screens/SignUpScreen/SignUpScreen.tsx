import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [useremail, setUseremail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState(false); 
  const [timer, setTimer] = useState(180); 
  const [isTimerRunning, setIsTimerRunning] = useState(false); 

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      Alert.alert('시간 초과', '인증 시간이 초과되었습니다. 다시 시도해주세요.');
    }
  }, [timer, isTimerRunning]);

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
      const response = await fetch('https://gasip.site/swagger-ui/index.html?urls.primaryName=Gasip%20%EC%84%9C%EB%B9%84%EC%8A%A4%20V1#/Service%20Member%20Interface/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: useremail, 
        }),
      });
  
      if (!response.ok) {
        throw new Error('이메일 인증 요청에 실패했습니다.');
      }
  
      startTimer();
      setStep(2); 
    } catch (error: any) {
      console.error('이메일 인증 요청에 실패했습니다:', error.message);
      Alert.alert('이메일 인증 요청 실패', error.message);
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    //이메일로 인증번호 전송되는 로직 만들예정
  };

  const handleResendCode = async () => {
    setTimer(180);
    setIsTimerRunning(false);

    try {
      // 새로운 인증번호를 요청하는 API 호출
      const response = await fetch('https://gasip.site/swagger-ui/index.html?urls.primaryName=Gasip%20%EC%84%9C%EB%B9%84%EC%8A%A4%20V1#/Service%20Member%20Interface/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: useremail, // 사용자가 입력한 이메일로 변경
        }),
      });
  
      if (!response.ok) {
        throw new Error('새로운 인증번호 요청에 실패했습니다.');
      }

      // 성공적으로 요청되면 타이머 시작
      startTimer();
    } catch (error: any) {
      console.error('새로운 인증번호 요청에 실패했습니다:', error.message);
      Alert.alert('새로운 인증번호 요청 실패', error.message);
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
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
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
          />
  
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.reNum}>인증번호 다시받기</Text>
          </TouchableOpacity>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}> {Math.floor(timer / 60)}분{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}초</Text>
          </View>
         //여기다가 인증하기 버튼

        </View>
      )}

      {step === 3 && (
        <View>
          <Text>회원가입 단계 3</Text>
          <Button title="이전 단계" onPress={handlePreviousStep} />
          <Button title="완료" onPress={handleSubmit} />
        </View>
      )}

      {step === 4 && (
        <View>
          <Text>회원가입 단계 3</Text>
          <Button title="이전 단계" />
          <Button title="완료" onPress={handleSubmit} />
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

  emailText: {
    color: 'white',
    fontSize: 20,
    position: 'relative',
    bottom: 40,
    left: 165,
  },

  button: {
    marginTop: 50,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#4490D8', 
  },
  inactiveButton: {
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
