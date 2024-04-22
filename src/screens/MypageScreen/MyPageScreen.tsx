import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

import { MMKVStorage } from '@api/mmkv';
import { getUserData } from '@api/index';

import ProfileData from './ProfileData';
import AppInformation from './AppInformation';
import SettingModal from './SettingModal/SettingModal';

import Spacer from '@components/common/Spacer';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

export default function MyPageScreen() {
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUserData();

      if (result) {
        MMKVStorage.set('userNickname', result.nickname);
      }
    };

    if (MMKVStorage.getString('userNickname') === null) {
      fetchUserData();
    }
  }, []);

  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <GSHeader title="마이페이지" />
        <Spacer type="height" value={30} />
        <OpenSettingModalButton
          setIsSettingsModalVisible={setIsSettingsModalVisible}
        />
        <Spacer type="height" value={20} />
        <ProfileData />
        <Spacer type="height" value={20} />
        <AppInformation />
      </View>
      <SettingModal
        isVisible={isSettingsModalVisible}
        setIsVisible={setIsSettingsModalVisible}
      />
    </SafeAreaLayout>
  );
}

const OpenSettingModalButton = ({
  setIsSettingsModalVisible,
}: {
  setIsSettingsModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <View style={styles.goToSettingsButtonContainer}>
      <TouchableOpacity
        onPress={() => {
          setIsSettingsModalVisible(true);
        }}
      >
        <Text style={styles.goToSettingsButtonText}>설정</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  goToSettingsButtonContainer: {
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center',
  },
  goToSettingsButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.BTN_MAIN,
  },
});
