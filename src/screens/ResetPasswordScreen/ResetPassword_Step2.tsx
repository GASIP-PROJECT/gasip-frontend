import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

import icon_lock from '@assets/icon_lock.png';
import icon_goback from '@assets/icon_goback.png';
import icon_show_password from '@assets/icon_show_password.png';
import icon_hide_password from '@assets/icon_hide_password.png';
import { resetPassword } from '@api/index';

export default function ResetPassword_Step2({ navigation, route }) {
  const { emailToVerifyCode } = route.params;

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordDontMatchError, setShowPasswordDontMatchError] =
    useState(false);

  const [isPasswordChangeComplete, setIsPasswordChangeComplete] =
    useState(false);

  const passwordsMatch = password === confirmPassword;

  const validatePassword = (password: string) => {
    if (password === '') return false;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordPattern.test(password);
  };

  const isPasswordValid = validatePassword(password);

  const handleConfirmButtonPress = async () => {
    if (!passwordsMatch) {
      setShowPasswordDontMatchError(true);
      return;
    }

    setShowPasswordDontMatchError(false);
    await resetPassword(emailToVerifyCode, password);

    // 버튼 비활성화
    setIsPasswordChangeComplete(true);

    showPasswordChangeSuccessAlert();
    // deal with password confirm and alert
  };

  const getPasswodConfirmTextInputBorderColor = () => {
    if (showPasswordDontMatchError) return COLORS.RED;
    if (isPasswordValid) return COLORS.BLUE_PRIMARY;
    return COLORS.GRAY_400;
  };

  const handlePasswordInputChange = (text: string) => {
    setPassword(text);
    if (showPasswordDontMatchError) setShowPasswordDontMatchError(false);
  };

  const handlePasswordConfirmInputChange = (text: string) => {
    setConfirmPassword(text);
    if (showPasswordDontMatchError) setShowPasswordDontMatchError(false);
  };

  const showPasswordChangeSuccessAlert = () => {
    Alert.alert(
      '비밀번호 변경 성공',
      '로그인 페이지로 이동합니다.',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <GSHeader
          title={'비밀번호 재설정하기'}
          leftComponent={
            <Image source={icon_goback} style={{ width: 28, height: 28 }} />
          }
          onLeftComponentPress={navigation.goBack}
          rightComponent={
            <Image
              source={icon_goback}
              style={{ width: 28, height: 28 }}
              tintColor={'transparent'}
            />
          }
          paddingHorizontal={0}
        />

        <Spacer type="height" value={24} />
        <GSText style={styles.inputLabelText}>비밀번호</GSText>
        <Spacer type="height" value={8} />
        <View
          style={[
            {
              borderColor: isPasswordValid
                ? COLORS.BLUE_PRIMARY
                : COLORS.GRAY_400,
            },
            styles.inputContainer,
          ]}
        >
          <Image source={icon_lock} style={{ tintColor: COLORS.GRAY_400 }} />
          <Spacer type="width" value={6} />
          <TextInput
            style={{ flex: 1, color: COLORS.BLACK }}
            placeholder=" 비밀번호를 입력해주세요"
            value={password}
            onChangeText={text => handlePasswordInputChange(text)}
            secureTextEntry={!showPassword}
          />
          <Spacer type="width" value={6} />
          <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
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
        <Spacer type="height" value={10} />

        <GSText
          style={[
            styles.informText,
            { color: isPasswordValid ? COLORS.BLUE_PRIMARY : COLORS.GRAY_400 },
          ]}
        >
          영문, 숫자, 특수문자를 사용해 8~20자리를 입력해주세요
        </GSText>

        <Spacer type="height" value={20} />

        <GSText style={styles.inputLabelText}>비밀번호 재입력</GSText>
        <Spacer type="height" value={8} />
        <View
          style={[
            {
              borderColor: getPasswodConfirmTextInputBorderColor(),
            },
            styles.inputContainer,
          ]}
        >
          <Image source={icon_lock} style={{ tintColor: COLORS.GRAY_400 }} />
          <Spacer type="width" value={6} />
          <TextInput
            style={{ flex: 1, color: COLORS.BLACK }}
            placeholder=" 비밀번호를 재입력해주세요"
            value={confirmPassword}
            onChangeText={text => handlePasswordConfirmInputChange(text)}
            secureTextEntry={!showConfirmPassword}
          />
          <Spacer type="width" value={6} />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(prev => !prev)}
          >
            {showConfirmPassword ? (
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

        <Spacer type="height" value={10} />

        <View style={{ height: 12 }}>
          {showPasswordDontMatchError && (
            <GSText
              style={{ fontSize: 12, fontWeight: '400', color: COLORS.RED }}
            >
              비밀번호가 일치하지 않습니다.
            </GSText>
          )}
        </View>

        <Spacer type="height" value={76} />

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isPasswordValid
                ? COLORS.BLUE_PRIMARY
                : COLORS.WHITE,
            },
          ]}
          onPress={handleConfirmButtonPress}
          disabled={!isPasswordValid || isPasswordChangeComplete}
        >
          <GSText
            style={[
              styles.buttonText,
              { color: isPasswordValid ? COLORS.WHITE : COLORS.GRAY_400 },
            ]}
          >
            확인
          </GSText>
        </TouchableOpacity>
      </View>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
  },
  inputLabelText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.GRAY_500,
    marginLeft: 8,
  },
  inputContainer: {
    height: 60,
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 26,
  },
  informText: {
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 10,
  },
  button: {
    borderRadius: 16,
    borderColor: COLORS.GRAY_400,
    borderStyle: 'solid',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
