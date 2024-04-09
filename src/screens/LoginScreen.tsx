import React, { useState } from 'react';
import { Text, TextInput,  Button, View, StyleSheet } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 로직을 여기에 추가하세요
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title="GASIP 로그인"
          onPress={handleLogin}
          color="#4490D8"
        />
        <Text style={styles.forgotPasswordLink}>
          아이디/비밀번호 찾기
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B5159', // 배경색을 여기서 변경할 수 있습니다.
  },

  formContainer: {
    width: '80%',
  },

  input: {
    height: 50,
    width: '100%',
    borderRadius: 12,
    marginBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: '#3E4044', // 입력 필드 배경색
  },

  forgotPasswordLink: {
    marginTop: 10,
    textAlign: 'center',
    color: '#FFFFFF', // 링크 텍스트 색상
    fontSize: 11,
  },
});
