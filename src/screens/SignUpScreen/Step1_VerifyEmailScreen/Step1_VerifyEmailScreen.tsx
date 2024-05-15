import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import InputEmailScreen from './InputEmailScreen';
import SignUpProcessHeader from '../SignUpProcessHeader';
import VerifyEmailCodeScreen from './VerifyEmailCodeScreen';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

export default function Step1_VerifyEmailScreen({ navigation }) {
  const [isWaitingForCodeVerification, setIsWaitingForCodeVerification] =
    useState<boolean>(false);
  const [emailToVerifyCode, setEmailToVerifyCode] = useState<string>('');

  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <SignUpProcessHeader step={1} onBackButtonPress={navigation.goBack} />
        {isWaitingForCodeVerification ? (
          <VerifyEmailCodeScreen emailToVerifyCode={emailToVerifyCode} />
        ) : (
          <InputEmailScreen
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
