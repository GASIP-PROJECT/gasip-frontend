import React from 'react';
import { Text } from 'react-native';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

export default function LoginScreen() {
  return (
    <SafeAreaLayout style={{ flex: 1 }}>
      <Text style={{ paddingHorizontal: 16, lineHeight: 20 }}>
        로그인 화면입니다 태헌님. 앱이 켜졌을 때 이 화면으로 먼저 진입되도록
        처리되어 있습니다. 회원가입 화면도 SignUpScreen이라는 컴포넌트만
        만들어두었습니다. 이 화면에서 로그인 UI를 구현해주시면 됩니다. 혹시나
        로그인을 구현하는 방향성에 대해서 논의가 필요하다면 편하게 말씀해주세요.
      </Text>
    </SafeAreaLayout>
  );
}
