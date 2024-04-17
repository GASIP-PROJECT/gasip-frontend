import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Spacer from '@components/common/Spacer';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

import icon_hand from '@assets/icon_hand.png';

interface ChangePasswordModalProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

// TODO - ICON_SIZE 여기 선언하는게 맞는가?
const ICON_SIZE = 27;

export default function ChangePasswordModal({
  isVisible,
  setIsVisible,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const handlePressChangePassword = () => {};

  return (
    <Modal visible={isVisible} animationType="slide">
      <SafeAreaLayout backgroundColor="#4b5159">
        <Header setIsVisible={setIsVisible} />
        <View style={styles.container}>
          <Spacer type="height" value={20} />
          <Image source={icon_hand} style={{ width: 36, height: 36 }} />
          <Spacer type="height" value={20} />
          <ChangeNicknameText />
          <Spacer type="height" value={20} />
          <ChangeNickNameTextInput setNewNickname={setCurrentPassword} />
          <Spacer type="height" value={10} />
          <ChangeNickNameTextInput setNewNickname={setNewPassword} />
          <Spacer type="height" value={10} />
          <ChangeNickNameTextInput setNewNickname={setNewPasswordConfirm} />
          <Spacer type="height" value={20} />
          <Button buttonText="변경하기" onPress={handlePressChangePassword} />
        </View>
      </SafeAreaLayout>
    </Modal>
  );
}

const Header = ({
  setIsVisible,
}: {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <GSHeader
      title="닉네임 변경"
      leftComponent={
        <Icon
          name="close-outline"
          size={ICON_SIZE}
          style={{ color: COLORS.WHITE }}
        />
      }
      onLeftComponentPress={() => setIsVisible(false)}
    />
  );
};

const ChangeNicknameText = () => {
  return (
    <Text style={styles.changeNicknameText}>
      변경할 비밀번호를 입력해주세요!
    </Text>
  );
};

const ChangeNickNameTextInput = ({ setNewNickname }) => {
  return (
    <TextInput
      placeholder="닉네임을 입력해주세요"
      placeholderTextColor={'#717670'}
      style={{
        borderColor: COLORS.WHITE,
        borderWidth: 1,
        height: 56,
        borderRadius: 10,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 16,
        color: '#717670',
      }}
      onChangeText={text => setNewNickname(text)}
      onSubmitEditing={() => {}}
      secureTextEntry={true}
    />
  );
};

const Button = ({ buttonText, onPress }) => {
  return (
    <TouchableOpacity style={[styles.btnContainer]} onPress={onPress}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  letterCountContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  letterCountText: {
    color: COLORS.WHITE,
    fontSize: 12,
  },
  closeButtonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  changeNicknameText: {
    fontSize: 20,
    fontWeight: '500',
    // textAlign: 'center',
    color: COLORS.WHITE,
  },

  btnContainer: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.BTN_MAIN,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: '700',
  },
});
