import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyPageElement from './MyPageElement';

export default function AppInformation() {
  return (
    <View style={styles.container}>
      <MyPageElement title="공지사항" />
      <MyPageElement title="문의하기" />
      <MyPageElement title="개인정보 보호방침" />
      <MyPageElement title="서비스 이용약관" />
      <MyPageElement
        title="버전 정보"
        rightButtonElement={
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#DADADA' }}>
            1.0.0
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#28292A',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});
