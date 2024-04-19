import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import GSIcon from '@components/common/GSIcon';

import { COLORS } from '@styles/colors';

// TODO - 비슷한 헤더들 분리
export default function MyFeedsScreenHeader() {
  return (
    <View style={styles.container}>
      <HeaderCloseButton />
      <HeaderTitle />
      <View style={{ flex: 1 }} />
    </View>
  );
}

const HeaderCloseButton = () => {
  const navigation = useNavigation();

  const closeModal = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.closeButtonContainer}>
      <TouchableOpacity style={{ flex: 1 }} onPress={closeModal}>
        <GSIcon name="chevron-back-outline" />
      </TouchableOpacity>
    </View>
  );
};

const HeaderTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>설정 </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});
