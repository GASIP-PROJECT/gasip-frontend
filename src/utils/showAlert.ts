// TODO - ts 파일 절대 경로 import 안되는 문제 해결

import { Alert } from 'react-native';

export const showOneButtonAlert = (
  title: string = '',
  message: string = '',
  buttonText: string = '확인',
  onPress: () => void = () => {},
) => {
  Alert.alert(title, message, [
    {
      text: buttonText,
      onPress: onPress,
    },
  ]);
};
