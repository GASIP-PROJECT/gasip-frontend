import React, { useState } from 'react';
import {
  TextInput,
  Image,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { setMMKVStorageAuthData } from '@api/mmkv';
import { signIn, updateAxiosClientHeaderAuthorization } from '@api/index';
import { useAuth } from '@contexts/AuthContext';
import { showOneButtonAlert } from '@utils/showAlert';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import GSButton from '@components/common/GSButton';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';
import gasip_logo from '@assets/gasip_logo.png';
import icon_show_password from '@assets/icon_show_password.png';
import icon_hide_password from '@assets/icon_hide_password.png';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { dispatch } = useAuth();

  const handleSignIn = async () => {
    const result = await signIn(useremail, password);

    if (!result) {
      showOneButtonAlert(
        '로그인 실패',
        '이메일과 비밀번호를 다시 확인해주세요',
        '확인',
      );
      return;
    }

    const { accessToken, nickname, memberId } = result;

    setMMKVStorageAuthData(accessToken, nickname, memberId);

    // Axios 인스턴스 authorization 헤더를 로그인 한 user의 accessToken으로 재설정
    updateAxiosClientHeaderAuthorization(accessToken);

    dispatch({
      type: 'SIGN_IN',
      payload: {
        userToken: accessToken,
        isLoading: false,
      },
    });
  };

  const handleSignup = () => {
    navigation.navigate('SignUp_Step1');
  };

  const ResetPw = () => {
    navigation.navigate('ResetPassword_Step1');
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
                placeholderTextColor={COLORS.GRAY_400}
              />
              <Spacer type="height" value={12} />
              <View
                style={[
                  { flexDirection: 'row', alignItems: 'center' },
                  styles.input,
                ]}
              >
                <TextInput
                  style={{ flex: 1, color: COLORS.BLACK }}
                  placeholder=" 비밀번호"
                  placeholderTextColor={COLORS.GRAY_400}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCorrect={false}
                  textContentType="oneTimeCode"
                />
                <Spacer type="width" value={5} />
                <TouchableOpacity
                  onPress={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? (
                    <Image
                      source={icon_hide_password}
                      style={{ width: 24, height: 24 }}
                    />
                  ) : (
                    <Image
                      source={icon_show_password}
                      style={{ width: 24, height: 24 }}
                    />
                  )}
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
            <GSButton
              onPress={handleSignIn}
              buttonText="로그인"
              fontSize={18}
              borderRadius={16}
              height={60}
            />
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
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
    color: COLORS.BLACK,
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
