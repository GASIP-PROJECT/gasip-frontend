import React, { useState } from 'react';
import { Text, TextInput, Image, View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { setMMKVStorageAuthData } from '@api/mmkv';
import { useAuth } from '@contexts/AuthContext';

import Spacer from '@components/common/Spacer';
import GSButton from '@components/common/GSButton';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';
import gasip_logo from '@assets/gasip_logo.png';

export default function LoginScreen() {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const { dispatch } = useAuth();

  //   email: 'ji@test.com',
  //   password: 'passwordtest1!',
  //   // name: '마지혁',

  const handleLogin = async () => {
    try {
      const response = await fetch('https://gasip.site/members/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: useremail, password }),
      });

      const loginResult = await response.json();

      const { accessToken, userNickname, memberId } = loginResult.response;
      setMMKVStorageAuthData(accessToken, userNickname, memberId);

      dispatch({
        type: 'SIGN_IN',
        payload: {
          userToken: loginResult.response.accessToken,
          isLoading: false,
        },
      });

      if (!response.ok) {
        throw new Error('이메일 or 비밀번호가 일치하지 않습니다');
      }

      //navigation.navigate('#');  로그인 성공하면 이동하는 곳.
    } catch (error: any) {
      Alert.alert(
        '로그인 실패',
        error.message || '알 수 없는 오류가 발생했습니다.',
      );
    }
  };

  const handleSignup = () => {
    navigation.navigate('SignUpScreen');
  };

  const ResetPw = () => {
    navigation.navigate('ResetPasswordScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.logo}>
          <Image
            source={gasip_logo}
            style={styles.gasipLogo}
            resizeMode="contain"
          />
          <Image
            source={require('@assets/gasip_text.png')}
            style={styles.gasipLogoText}
            resizeMode="contain"
          />
          <Text style={styles.gasipSupText}>
            가천인을 위한 교수님 전문 리뷰앱
          </Text>
        </View>
        <View style={styles.mainForm}>
          <TextInput
            style={styles.input}
            placeholder="이메일"
            value={useremail}
            onChangeText={setUseremail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <GSButton onPress={handleLogin} buttonText="로그인" />
          <Text onPress={ResetPw} style={styles.forgotPasswordLink}>
            비밀번호 재설정
          </Text>
          <Text style={styles.Text}>
            아직 회원이 아니신가요?
            <Text style={styles.signUp} onPress={handleSignup}>
              {' '}
              학교 이메일로 회원가입
            </Text>
          </Text>
        </View>
      </View>

      <GSButton
        onPress={handleSignup}
        buttonText="학교 이메일로 회원가입"
        bgColor={COLORS.WHITE}
        btnTextColor={COLORS.BTN_MAIN}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  formContainer: {
    width: '80%',
  },

  input: {
    height: 60,
    width: '100%',
    borderRadius: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#9EA4AA',
    marginBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },

  signUp: {
    textDecorationLine: 'underline',
    color: '#007AFF',
  },

  mainForm: {
    position: 'relative',
    bottom: 190,
  },

  Text: {
    position: 'relative',
    top: '20%',
    textAlign: 'center',
    color: '#9EA3B2',
  },

  forgotPasswordLink: {
    marginTop: 10,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 13,
  },

  logo: {
    alignItems: 'center',
  },

  gasipLogo: {
    position: 'relative',
    top: 90,
    width: '100%',
  },

  gasipLogoText: {
    position: 'relative',
    bottom: 100,
    width: '30%',
  },

  gasipSupText: {
    position: 'relative',
    bottom: 265,
    fontSize: 16,
    color: '#007AFF',
    letterSpacing: -0.4,
  },
});