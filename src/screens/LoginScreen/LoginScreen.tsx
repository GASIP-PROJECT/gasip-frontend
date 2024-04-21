import React, { useState } from 'react';
import {
  Text,
  TextInput,
  Image,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '@contexts/AuthContext';

import GSButton from '@components/common/GSButton';

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

      await AsyncStorage.setItem('userToken', loginResult.response.accessToken);
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

  const handleSignup = async () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View>
          <Image
            source={gasip_logo}
            style={styles.gasipLogo}
            resizeMode="contain"
          />
        </View>
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
        <Text style={styles.forgotPasswordLink}>아이디/비밀번호 찾기</Text>
        <TouchableOpacity
          style={[styles.button, { top: 200, left: 0 }]}
          onPress={handleSignup}
        >
          <Text>학교 이메일로 회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B5159',
  },

  formContainer: {
    width: '80%',
  },

  input: {
    height: 50,
    width: '100%',
    borderRadius: 12,
    marginBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: '#3E4044',
  },

  forgotPasswordLink: {
    marginTop: 10,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 13,
  },

  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  gasipLogo: {
    marginBottom: 20,
    marginLeft: 50,
    width: '75%',
    justifyContent: 'center',
  },
});
