import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MyPageElement from './MyPageElement';

import GSIcon from '@components/common/GSIcon';

import { COLORS } from '@styles/colors';

export default function ProfileData({ nickname }: { nickname: string | null }) {
  const navigation = useNavigation();

  const nickenameText = nickname ? `${nickname} 님` : 'Guest 님';

  const handleMyFeedsPress = async () => {
    navigation.navigate('MyFeedsScreen');
  };

  return (
    <View style={styles.container}>
      <MyPageElement title={nickenameText} disabled />
      <MyPageElement
        title="내가 쓴 글"
        onPress={handleMyFeedsPress}
        rightButtonElement={<GSIcon name="chevron-forward-outline" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#28292A',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  fixNickNameButtonContainer: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.BTN_MAIN,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixNickNameButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
});
