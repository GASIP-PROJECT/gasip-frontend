import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import GSText from '@components/common/GSText';

import { COLORS } from '@styles/colors';
import icon_serach from '@assets/icon_search.png';

// TODO - 컬러 팔레트 확정 후 컬러 변경 필요
export default function SearchButton() {
  const navigation = useNavigation();

  const handleSearchButtonPress = () => {
    navigation.navigate('SearchScreen');
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles.containerShadow,
        styles.containerElevation,
      ]}
      onPress={handleSearchButtonPress}
    >
      <GSText style={styles.placeholderText}>
        교수님 or 학과를 입력해주세요.
      </GSText>
      <Image source={icon_serach} style={{ width: 24, height: 24 }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: 100,
    borderColor: COLORS.BLUE_LIGHT_100,
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  placeholderText: {
    fontSize: 14,
    color: COLORS.GRAY_400,
    fontWeight: '400',
    letterSpacing: -0.25,
  },
  containerShadow: {
    shadowColor: COLORS.BLUE_LIGHT_100,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  containerElevation: {
    elevation: 5,
    shadowColor: COLORS.BLUE_LIGHT_100,
  },
});
