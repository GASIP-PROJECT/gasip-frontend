import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import useSignUpDataStore from '@store/signUpDataStore';

import SignUpProcessHeader from '@screens/SignUpScreen/SignUpProcessHeader';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

export default function Step3_CreateUserInfoScreen({ navigation }) {
  const verifiedEmail = useSignUpDataStore(state => state.verifiedEmail);
  const password = useSignUpDataStore(state => state.password);
  const resetSignUpData = useSignUpDataStore(state => state.resetSignUpData);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const isNameValid = name !== '';
  const isNicknameValid = nickname.length >= 2 && nickname.length <= 12;

  const isUserInfoValid = isNameValid && isNicknameValid;

  const handleConfirmButtonPress = async () => {
    console.log(verifiedEmail, password, name, nickname);
  };

  const handleBackButtonPress = () => {
    navigation.goBack();
    resetSignUpData();
  };

  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <SignUpProcessHeader
          step={3}
          onBackButtonPress={handleBackButtonPress}
        />
        <GSText style={styles.inputLabelText}>이름</GSText>
        <Spacer type="height" value={8} />
        <TextInput
          style={[
            styles.input,
            {
              borderStyle: 'solid',
              borderWidth: 1,
              backgroundColor: '#fff',
              borderRadius: 16,
              borderColor: '#9EA4AA',
            },
          ]}
          placeholder="이름을 입력해주세요"
          value={name}
          onChangeText={text => setName(text)}
        />
        <Spacer type="height" value={10} />
        <GSText
          style={{
            fontSize: 12,
            fontWeight: '400',
            color: COLORS.GRAY_400,
            paddingLeft: 8,
          }}
        >
          앱에서는 닉네임으로 활동하게 됩니다.
        </GSText>

        <Spacer type="height" value={20} />

        <GSText style={styles.inputLabelText}>닉네임</GSText>
        <Spacer type="height" value={10} />
        <TextInput
          style={[
            styles.input,
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
          onChangeText={text => setNickname(text)}
        />

        <Spacer type="height" value={10} />

        {!isNicknameValid && (
          <GSText style={styles.informText}>2~12자 이내로 설정해주세요.</GSText>
        )}

        <Spacer type="height" value={50} />

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isUserInfoValid
                ? COLORS.BLUE_PRIMARY
                : COLORS.WHITE,
            },
          ]}
          onPress={handleConfirmButtonPress}
          disabled={!isUserInfoValid}
        >
          <GSText
            style={[
              styles.buttonText,
              { color: isUserInfoValid ? COLORS.WHITE : COLORS.GRAY_400 },
            ]}
          >
            회원가입 완료!
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
  input: {
    height: 60,
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 26,
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
  informText: {
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 8,
    color: COLORS.GRAY_400,
  },
});
