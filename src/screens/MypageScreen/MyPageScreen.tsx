import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { useMMKVString } from 'react-native-mmkv';

import { useAuth } from '@contexts/AuthContext';
import { deleteAccount } from '@api/index';
import { clearMMKVStorageAuthData } from '@api/mmkv';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import GSIcon from '@components/common/GSIcon';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

import icon_goback from '@assets/icon_goback.png';

export default function MyPageScreen({ navigation }) {
  const { dispatch } = useAuth();
  const [nickName] = useMMKVString('userNickname');

  const signOut = () => {
    dispatch({
      type: 'SIGN_OUT',
      payload: { userToken: null, isLoading: false },
    });
    clearMMKVStorageAuthData();
  };

  const handleSignOutPress = () => {
    Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => {
          signOut();
        },
      },
    ]);
  };

  const handleAccountDeletePress = () => {
    Alert.alert('서비스 탈퇴', '정말 탈퇴 하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: async () => {
          await deleteAccount();
          signOut();
        },
      },
    ]);
  };

  const handleInquirePress = () => {
    Linking.openURL('https://pf.kakao.com/_PxjxheG');
  };

  return (
    <SafeAreaLayout backgroundColor={COLORS.GRAY_100}>
      <GSHeader
        title="마이페이지"
        leftComponent={
          <Image source={icon_goback} style={{ width: 28, height: 28 }} />
        }
        onLeftComponentPress={navigation.goBack}
        rightComponent={<View style={{ width: 28, height: 28 }} />}
      />
      <View style={styles.container}>
        <Spacer type="height" value={43} />

        <GSText style={styles.elementTitle}>
          {nickName || 'Guest'} 님의 계정
        </GSText>

        <Spacer type="height" value={8} />
        <TouchableOpacity
          style={[
            styles.elementContainer,
            {
              height: 36,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}
          onPress={() => navigation.navigate('MyFeedsScreen')}
        >
          <GSText style={styles.elementText}>내가 쓴 글</GSText>
          <GSIcon
            name="chevron-forward-outline"
            size={20}
            color={COLORS.GRAY_400}
          />
        </TouchableOpacity>

        <Spacer type="height" value={32} />

        {/* 개인 및 보안 */}
        <GSText style={styles.elementTitle}>개인 및 보안</GSText>
        <Spacer type="height" value={8} />
        <View style={styles.elementContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangeNicknameScreen')}
            style={styles.element}
          >
            <GSText style={styles.elementText}>닉네임 변경</GSText>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePasswordScreen')}
            style={styles.element}
          >
            <GSText style={styles.elementText}>비밀번호 변경</GSText>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={handleSignOutPress} style={styles.element}>
            <GSText style={styles.elementText}>로그아웃</GSText>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            onPress={handleAccountDeletePress}
            style={styles.element}
          >
            <GSText style={[styles.elementText, { color: COLORS.RED }]}>
              서비스 탈퇴하기
            </GSText>
          </TouchableOpacity>
        </View>

        <Spacer type="height" value={32} />

        {/* 기타 */}
        <GSText style={styles.elementTitle}>기타</GSText>
        <Spacer type="height" value={8} />
        <View style={styles.elementContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.element}>
            <GSText style={styles.elementText}>공지사항</GSText>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={handleInquirePress} style={styles.element}>
            <GSText style={styles.elementText}>문의하기</GSText>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => {}} style={styles.element}>
            <GSText style={styles.elementText}>개인정보 보호방침</GSText>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => {}} style={styles.element}>
            <GSText style={styles.elementText}>서비스 이용약관</GSText>
          </TouchableOpacity>
          <Divider />
          <View
            style={[
              styles.element,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}
          >
            <GSText style={styles.elementText}>버전 정보</GSText>
            <GSText style={styles.elementText}>1.0.0</GSText>
          </View>
        </View>
      </View>
    </SafeAreaLayout>
  );
}

const Divider = () => {
  return (
    <View
      style={{ height: 1, backgroundColor: COLORS.GRAY_200, opacity: 0.8 }}
    />
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
  elementContainer: {
    backgroundColor: COLORS.GRAY_50,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
  },
  element: {
    height: 36,
    justifyContent: 'center',
  },
  elementText: {
    fontSize: 14,
    fontWeight: '400',
  },
  elementTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});
