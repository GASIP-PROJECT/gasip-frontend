import React, { SetStateAction, Dispatch, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import MyPageElement from '@screens/MypageScreen/MyPageElement';
import ChangeNicknameModal from '@screens/MypageScreen/ChangeNicknameModal/ChangeNicknameModal';

import Spacer from '@components/common/Spacer';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

// TODO - ICON_SIZE 여기 선언하는게 맞는가?
const ICON_SIZE = 27;

interface SettingModalProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export default function SettingModal({
  isVisible,
  setIsVisible,
}: SettingModalProps) {
  const [showNicknameModal, setShowNicknameModal] = useState(false);

  return (
    <Modal visible={isVisible} animationType="slide">
      <SafeAreaLayout>
        <ModalHeader setIsVisible={setIsVisible} />
        <View style={styles.container}>
          <Spacer type="height" value={20} />
          <View style={styles.container}>
            <MyPageElement
              title="닉네임 변경"
              onPress={() => setShowNicknameModal(true)}
            />
            <MyPageElement title="비밀번호 변경" onPress={() => {}} />
            <MyPageElement title="로그아웃" />
            <MyPageElement title="서비스 탈퇴하기" />
          </View>
        </View>
      </SafeAreaLayout>
      <ChangeNicknameModal
        isVisible={showNicknameModal}
        setIsVisible={setShowNicknameModal}
      />
    </Modal>
  );
}

const ModalHeader = ({
  setIsVisible,
}: {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <GSHeader
      title="설정"
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
