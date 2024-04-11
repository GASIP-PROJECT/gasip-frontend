import React from 'react';
import { View, Text, Button } from 'react-native';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

const SignUpScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('LoginScreen'); // 로그인 화면으로 이동
  };

  return (
    <SafeAreaLayout>
      <Text>회원가입 화면</Text>
      <Button title="뒤로 가기" onPress={handleGoBack} />
      <Button title="로그인 화면으로 이동" onPress={handleNavigateToLogin} />
    </SafeAreaLayout>
  );
};

export default SignUpScreen;
