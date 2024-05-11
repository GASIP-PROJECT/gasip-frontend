import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { MMKVStorage } from '@api/mmkv';
import { changeNickname } from '@api/index';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';
import icon_goback from '@assets/icon_goback.png';

export default function ChangeNicknameScreen({ navigation }) {
  const [newNickname, setNewNickname] = useState('');

  const handlePressChangeNickname = async () => {
    if (newNickname.length) {
      const changedNickname = await changeNickname(newNickname);

      MMKVStorage.set('userNickname', changedNickname);
      alertNicknameChanged();
    } else {
      Alert.alert('새 닉네임을 입력해주세요.');
    }
  };

  const alertNicknameChanged = () => {
    Alert.alert('닉네임 변경 완료', '닉네임이 변경되었습니다.', [
      {
        text: '확인',
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <SafeAreaLayout>
      <GSHeader
        title="닉네임 변경하기"
        leftComponent={
          <Image source={icon_goback} style={{ width: 28, height: 28 }} />
        }
        onLeftComponentPress={navigation.goBack}
      />

      <Spacer type="height" value={40} />

      <View style={{ paddingHorizontal: 24 }}>
        <ChangeNickNameTextInput
          setNewNickname={setNewNickname}
          onSubmitEditing={handlePressChangeNickname}
        />
        <Spacer type="height" value={64} />
        <ChangeNicknameButton
          buttonText="저장"
          onPress={handlePressChangeNickname}
        />
      </View>
    </SafeAreaLayout>
  );
}

const ChangeNickNameTextInput = ({
  setNewNickname,
  onSubmitEditing,
}: {
  setNewNickname: Dispatch<SetStateAction<string>>;
  onSubmitEditing: () => void;
}) => {
  return (
    <View>
      <GSText style={styles.newNicknameInputLabel}>새 닉네임</GSText>
      <Spacer type="height" value={8} />
      <TextInput
        placeholder="닉네임을 입력해주세요"
        placeholderTextColor={COLORS.BTN_MAIN}
        style={{
          borderWidth: 1,
          height: 56,
          borderRadius: 10,
          backgroundColor: COLORS.WHITE,
          paddingHorizontal: 16,
          color: COLORS.BTN_MAIN,
          borderColor: COLORS.BLUE_PRIMARY,
        }}
        onChangeText={text => setNewNickname(text)}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

const ChangeNicknameButton = ({
  buttonText,
  onPress,
}: {
  buttonText: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <GSText style={styles.buttonText}>{buttonText}</GSText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  newNicknameInputLabel: {
    paddingLeft: 16,
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
    shadowOffset: { width: 0, height: 4 },
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
