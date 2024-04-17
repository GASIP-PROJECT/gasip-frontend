import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { changeNickname } from '@api/index';

import Spacer from '@components/common/Spacer';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

import icon_plane from '@assets/icon_plane.png';

interface ChangeNicknameModalProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

// TODO - ICON_SIZE 여기 선언하는게 맞는가?
const ICON_SIZE = 27;

export default function ChangeNicknameModal({
  isVisible,
  setIsVisible,
}: ChangeNicknameModalProps) {
  const [newNickname, setNewNickname] = useState('');

  const handlePressChangeNickname = async () => {
    if (newNickname.length) {
      const changedNickname = await changeNickname(newNickname);
      console.log('닉네임 변경됨: ', changedNickname);
      alertNicknameChanged();
    }
  };

  const alertNicknameChanged = () => {
    Alert.alert('닉네임 변경 완료', '닉네임이 변경되었습니다.', [
      {
        text: '확인',
        onPress: () => {
          setIsVisible(false);
        },
      },
    ]);
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <SafeAreaLayout backgroundColor="#4b5159">
        <Header setIsVisible={setIsVisible} />
        <View style={styles.container}>
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
