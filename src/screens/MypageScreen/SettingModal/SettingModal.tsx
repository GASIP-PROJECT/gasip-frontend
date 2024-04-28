import React, { SetStateAction, Dispatch, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { clearMMKVStorageAuthData } from '@api/mmkv';
import { useAuth } from '@contexts/AuthContext';

import MyPageElement from '@screens/MypageScreen/MyPageElement';
import ChangeNicknameModal from '@screens/MypageScreen/ChangeNicknameModal/ChangeNicknameModal';
import ChangePasswordModal from '@screens/MypageScreen/ChangePasswordModal/ChangePasswordModal';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

interface SettingModalProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export default function SettingModal({
  isVisible,
  setIsVisible,
}: SettingModalProps) {
  const { dispatch } = useAuth();

  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleLogOut = async () => {
    setIsVisible(false);
    clearMMKVStorageAuthData();

    // TODO - iOS에서 동기적으로 실행하면 앱이 터진다. 갑자기 이러는데 원인을 모르겠음
    setTimeout(() => {
      dispatch({
        type: 'SIGN_OUT',
        payload: { userToken: null, isLoading: false },
      });
    }, 0);
  };

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
            <MyPageElement
              title="비밀번호 변경"
              onPress={() => setShowPasswordModal(true)}
            />
            <MyPageElement title="로그아웃" onPress={handleLogOut} />
            <MyPageElement title="서비스 탈퇴하기" />
          </View>
        </View>

        <ChangeNicknameModal
          isVisible={showNicknameModal}
          setIsVisible={setShowNicknameModal}
        />
        <ChangePasswordModal
          isVisible={showPasswordModal}
          setIsVisible={setShowPasswordModal}
        />
      </SafeAreaLayout>
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
      leftComponent={<GSIcon name="close-outline" />}
      onLeftComponentPress={() => setIsVisible(false)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
