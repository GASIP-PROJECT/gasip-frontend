import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

import MyPageScreenHeader from './MyPageScreenHeader';
import ProfileData from './ProfileData';
import AppInformation from './AppInformation';

import Spacer from '@components/common/Spacer';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

export default function MyPageScreen({ navigation }) {
  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <MyPageScreenHeader />
        <Spacer type="height" value={30} />
        <GoToSettingsButton navigation={navigation} />
        <Spacer type="height" value={20} />
        <ProfileData />
        <Spacer type="height" value={20} />
        <AppInformation />
      </View>
    </SafeAreaLayout>
  );
}

const GoToSettingsButton = ({ navigation }) => {
  const handleGotToSettingsPress = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.goToSettingsButtonContainer}>
      <TouchableOpacity onPress={handleGotToSettingsPress}>
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
