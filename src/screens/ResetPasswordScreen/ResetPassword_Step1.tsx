import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Spacer from '@components/common/Spacer';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import EmailInput from './EmailInput';
import VerifyEmailCode from './VerifyEmailCode';

import icon_goback from '@assets/icon_goback.png';

// TODO - 컴포넌트 네이밍 이게 최선인가..?
export default function ResetPassword_Step1({ navigation }) {
  const [isWaitingForCodeVerification, setIsWaitingForCodeVerification] =
    useState<boolean>(false);
  const [emailToVerifyCode, setEmailToVerifyCode] = useState<string>('');

  const handleGoToStep2 = () => {
    navigation.replace('ResetPassword_Step2', { emailToVerifyCode });
  };

  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <GSHeader
          title={'비밀번호 재설정하기'}
          leftComponent={
            <Image source={icon_goback} style={{ width: 28, height: 28 }} />
          }
          onLeftComponentPress={navigation.goBack}
          rightComponent={<View style={{ width: 28, height: 28 }} />}
          paddingHorizontal={0}
        />

        <Spacer type="height" value={40} />

        {isWaitingForCodeVerification ? (
          <VerifyEmailCode
            emailToVerifyCode={emailToVerifyCode}
            onVerificationSuccess={handleGoToStep2}
          />
        ) : (
          <EmailInput
            emailToVerifyCode={emailToVerifyCode}
            setEmailToVerifyCode={setEmailToVerifyCode}
            setIsWaitingForCodeVerification={setIsWaitingForCodeVerification}
          />
        )}
      </View>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
  },
});
