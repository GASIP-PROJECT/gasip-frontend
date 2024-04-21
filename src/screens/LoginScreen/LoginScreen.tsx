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
import SafeAreaLayout from '@components/common/SafeAreaLayout';
import { COLORS } from '@styles/colors';
import Spacer from '@components/common/Spacer';

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

  const handleSignup = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <SafeAreaLayout backgroundColor="#4B5159">
      <View style={styles.container}>
        <Image
          source={gasip_logo}
          style={styles.gasipLogo}
          resizeMode="contain"
        />
        <Spacer type="height" value={25} />
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
        {/* </View> */}
        <View style={{ width: '100%' }}>
          <GSButton
            onPress={handleLogin}
            buttonText="로그인"
            marginHorizontal={0}
          />
          <Text style={styles.forgotPasswordLink}>아이디/비밀번호 찾기</Text>
        </View>
      </View>

      <GSButton
        onPress={handleSignup}
        buttonText="학교 이메일로 회원가입"
        bgColor={COLORS.WHITE}
        btnTextColor={COLORS.BTN_MAIN}
      />
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  input: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    marginBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: '#3E4044',
    color: '#918989',
    fontSize: 16,
  },

  forgotPasswordLink: {
    marginTop: 10,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 13,
  },

  gasipLogo: {
    width: '75%',
    justifyContent: 'center',
  },
});
