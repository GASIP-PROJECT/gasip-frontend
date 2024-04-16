import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { changeNickname } from '@api/index';

import Spacer from '@components/common/Spacer';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

import icon_plane from '@assets/icon_plane.png';

// TODO - ICON_SIZE 여기 선언하는게 맞는가?
const ICON_SIZE = 27;

export default function ChangeNicknameScreen({ navigation }) {
  const [newNickname, setNewNickname] = useState('');

  const handlePressChangeNickname = async () => {
    if (newNickname.length) {
      const changedNickname = await changeNickname(newNickname);
      alertNicknameChanged();
    }
  };

  const alertNicknameChanged = () => {
    Alert.alert('닉네임 변경 완료', '닉네임이 변경되었습니다.', [
      {
        text: '확인',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaLayout backgroundColor="#4b5159">
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Spacer type="height" value={20} />
        <Image source={icon_plane} style={{ width: 36, height: 36 }} />
        <Spacer type="height" value={20} />
        <ChangeNicknameText />
        <Spacer type="height" value={20} />
        <ChangeNickNameTextInput setNewNickname={setNewNickname} />
        <Spacer type="height" value={20} />
        <Button
          buttonText="변경하기"
          onPress={handlePressChangeNickname}
          newNickName={newNickname}
        />
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
        <Text style={styles.title}>설정 </Text>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};

const ChangeNicknameText = () => {
  return (
    <Text style={styles.changeNicknameText}>변경할 닉네임을 입력해주세요!</Text>
  );
};

const ChangeNickNameTextInput = ({ setNewNickname }) => {
  return (
    <TextInput
      placeholder="닉네임을 입력해주세요"
      placeholderTextColor={COLORS.BTN_MAIN}
      style={{
        borderColor: COLORS.WHITE,
        borderWidth: 1,
        height: 56,
        borderRadius: 10,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 16,
        color: COLORS.BTN_MAIN,
      }}
      onChangeText={text => setNewNickname(text)}
      onSubmitEditing={undefined}
    />
  );
};

const Button = ({ buttonText, onPress, newNickName }) => {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, { opacity: newNickName === '' ? 0.5 : 1 }]}
      onPress={onPress}
      disabled={newNickName === ''}
    >
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
