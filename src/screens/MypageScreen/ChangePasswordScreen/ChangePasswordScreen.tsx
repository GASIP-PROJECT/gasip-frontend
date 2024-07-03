import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { changePassword } from '@api/index';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';
import icon_goback from '@assets/icon_goback.png';

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [isCurrentPasswordFocused, setIsCurrentPasswordFocused] =
    useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isNewPasswordConfirmFocused, setIsNewPasswordConfirmFocused] =
    useState(false);

  const handlePressChangePassword = async () => {
    await changePassword(newPassword);
  };

  const isAnyInputEmpty =
    !currentPassword || !newPassword || !newPasswordConfirm;
  const confirmButtonDisabled =
    isAnyInputEmpty || newPassword !== newPasswordConfirm;

  return (
    <SafeAreaLayout>
      <GSHeader
        title="비밀번호 변경하기"
        leftComponent={
          <Image source={icon_goback} style={{ width: 28, height: 28 }} />
        }
        onLeftComponentPress={navigation.goBack}
        rightComponent={<View style={{ width: 28, height: 28 }} />}
      />
      <Spacer type="height" value={10} />

      <View style={styles.container}>
        <GSText style={styles.passwordRestrictionText}>
          영문, 숫자, 특수문자를 사용해 8~20자리를 입력해주세요
        </GSText>

        <Spacer type="height" value={16} />

        <PasswordTextInput
          labelText="현재 비밀번호"
          setText={setCurrentPassword}
          placeholderText="기존 비밀번호를 입력해주세요."
          isFocused={isCurrentPasswordFocused}
          setIsFocused={setIsCurrentPasswordFocused}
        />

        <Spacer type="height" value={20} />

        <PasswordTextInput
          labelText="새 비밀번호"
          setText={setNewPassword}
          placeholderText="새로운 비밀번호를 입력해주세요."
          isFocused={isNewPasswordFocused}
          setIsFocused={setIsNewPasswordFocused}
        />

        <Spacer type="height" value={20} />

        <PasswordTextInput
          labelText="새 비밀번호 확인"
          setText={setNewPasswordConfirm}
          placeholderText="새로운 비밀번호를 재입력해주세요."
          isFocused={isNewPasswordConfirmFocused}
          setIsFocused={setIsNewPasswordConfirmFocused}
        />

        <Spacer type="height" value={32} />

        <ConfirmButton
          buttonText="저장"
          onPress={handlePressChangePassword}
          disabled={confirmButtonDisabled}
        />
      </View>
    </SafeAreaLayout>
  );
}

const PasswordTextInput = ({
  labelText,
  placeholderText,
  setText,
  isFocused,
  setIsFocused,
}: {
  labelText: string;
  placeholderText: string;
  setText: Dispatch<SetStateAction<string>>;
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <View>
      <GSText style={styles.inputLabel}>{labelText}</GSText>
      <Spacer type="height" value={8} />
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor={COLORS.GRAY_400}
        style={{
          borderColor: isFocused ? COLORS.BLUE_PRIMARY : COLORS.GRAY_400,
          borderWidth: 1,
          height: 56,
          borderRadius: 10,
          backgroundColor: COLORS.WHITE,
          paddingHorizontal: 16,
          color: COLORS.BTN_MAIN,
        }}
        onChangeText={text => setText(text)}
        onSubmitEditing={undefined}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const ConfirmButton = ({
  buttonText,
  onPress,
  disabled,
}: {
  buttonText: string;
  onPress: () => void;
  disabled: boolean;
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          backgroundColor: disabled ? COLORS.WHITE : COLORS.BLUE_PRIMARY,
          borderWidth: 1,
          borderColor: disabled ? COLORS.GRAY_400 : COLORS.BLUE_PRIMARY,
          shadowOffset: disabled
            ? { width: 0, height: 2 }
            : { width: 0, height: 4 },
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <GSText
        style={[
          styles.buttonText,
          { color: disabled ? COLORS.GRAY_400 : COLORS.WHITE },
        ]}
      >
        {buttonText}
      </GSText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  passwordRestrictionText: {
    fontSize: 12,
    color: COLORS.GRAY_400,
    alignSelf: 'center',
  },
  container: {
    paddingHorizontal: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.GRAY_500,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    elevationColor: COLORS.BLACK,
    backgroundColor: COLORS.BLUE_PRIMARY,
    height: 60,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
});
