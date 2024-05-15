import React, { useState } from 'react';
import {
  Text,
  TextInput,
  Image,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { resetToken } from '@api/index';
import { setMMKVStorageAuthData } from '@api/mmkv';
import { useAuth } from '@contexts/AuthContext';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import GSButton from '@components/common/GSButton';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';
import gasip_logo from '@assets/gasip_logo.png';
import icon_show_password from '@assets/icon_show_password.png';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      resetToken();

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
      console.log(response);
    } catch (error: any) {
      // TODO - 에러 핸들링 필요
      Alert.alert(
        '로그인 실패',
        // error.message || '알 수 없는 오류가 발생했습니다.',
        '입력한 회원 정보를 다시 확인해주세요.',
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      enabled
      keyboardVerticalOffset={Platform.select({
        ios: 0,
        android: 500,
      })}
    >
      <SafeAreaLayout backgroundColor={COLORS.WHITE}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Spacer type="height" value={0} />
            <View style={styles.logo}>
              <Image
                source={gasip_logo}
                style={styles.gasipLogo}
                resizeMode="contain"
              />
              <Image
                source={require('@assets/gasip_text.png')}
                style={styles.gasipLogoText}
              />
              <Spacer type="height" value={12} />
              <GSText style={styles.gasipSupText}>
                가천인을 위한 교수님 전문 리뷰앱
              </GSText>
            </View>
            <Spacer type="height" value={50} />
            <View style={styles.mainForm}>
              <TextInput
                style={styles.input}
                placeholder=" 이메일"
                value={useremail}
                onChangeText={setUseremail}
                autoCapitalize="none"
              />
              <Spacer type="height" value={12} />
              <View
                style={[
                  { flexDirection: 'row', alignItems: 'center' },
                  styles.input,
                ]}
              >
                <TextInput
                  style={{ flex: 1 }}
                  placeholder=" 비밀번호"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <Spacer type="width" value={5} />
                <TouchableOpacity
                  onPress={() => setShowPassword(prev => !prev)}
                >
                  <Image
                    source={icon_show_password}
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
              </View>
              <Spacer type="height" value={12} />

              <TouchableOpacity
                onPress={ResetPw}
                style={{ alignSelf: 'flex-end' }}
              >
                <GSText style={styles.resetPw}>비밀번호 찾기</GSText>
              </TouchableOpacity>
              <Spacer type="height" value={36} />
            </View>
            <GSButton onPress={handleLogin} buttonText="로그인" fontSize={18} />
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <GSText style={styles.text}>아직 회원이 아니신가요?</GSText>
              <TouchableOpacity onPress={handleSignup}>
                <GSText style={styles.signUp} onPress={handleSignup}>
                  {' '}
                  학교 이메일로 회원가입
                </GSText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaLayout>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  formContainer: {
    width: '100%',
    paddingHorizontal: 32,
  },

  input: {
    height: 60,
    width: '100%',
    borderRadius: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#9EA4AA',
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
  },

  signUp: {
    fontSize: 14,
    color: COLORS.BLUE_PRIMARY,
    fontWeight: '400',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },

  mainForm: {
    // backgroundColor: 'blue',
  },

  text: {
    fontSize: 14,
    color: COLORS.GRAY_400,
    fontWeight: '400',
    textAlign: 'center',
  },

  forgotPasswordLink: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 13,
  },

  logo: {
    alignItems: 'center',
  },

  gasipLogo: {
    width: 220,
    height: 220,
  },

  gasipLogoText: {
    width: 90,
    height: 40,
  },

  gasipSupText: {
    fontSize: 16,
    color: '#007AFF',
    letterSpacing: -0.4,
    fontWeight: '600',
  },

  resetPw: {
    fontSize: 14,
    color: COLORS.GRAY_400,
    fontWeight: '400',
  },
});
