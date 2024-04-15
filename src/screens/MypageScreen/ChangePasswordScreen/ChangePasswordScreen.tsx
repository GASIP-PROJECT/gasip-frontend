import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Spacer from '@components/common/Spacer';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

import icon_hand from '@assets/icon_hand.png';

// TODO - ICON_SIZE 여기 선언하는게 맞는가?
const ICON_SIZE = 27;
export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const handlePressChangePassword = () => {};
  return (
    <SafeAreaLayout backgroundColor="#4b5159">
      <View style={styles.container}>
        <Header navigation={navigation} />
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
  );
}

// TODO - Header 통일
const Header = ({ navigation }) => {
  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity style={{ flex: 1 }} onPress={handleBackButtonPress}>
          <Icon
            name="chevron-back-outline"
            size={ICON_SIZE}
            style={{ color: COLORS.WHITE }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>설정</Text>
      </View>
      <View style={{ flex: 1 }} />
    </View>
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
