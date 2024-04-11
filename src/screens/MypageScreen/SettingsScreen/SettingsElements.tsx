import React from 'react';
import { StyleSheet, View } from 'react-native';

import MyPageElement from '@screens/MypageScreen/MyPageElement';

export default function SettingsElements() {
  return (
    <View style={styles.container}>
      <MyPageElement title="닉네임 변경" />
      <MyPageElement title="비밀번호 변경" />
      <MyPageElement title="로그아웃" />
      <MyPageElement title="서비스 탈퇴하기" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#28292A',
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 10,
  },
});
