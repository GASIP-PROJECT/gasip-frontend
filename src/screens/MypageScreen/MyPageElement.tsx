import React, { ReactElement } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyPageElementProps {
  title: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  rightButtonElement?: ReactElement | null;
}

export default function MyPageElement({
  title,
  onPress = undefined,
  rightButtonElement = null,
}: MyPageElementProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.titleText}>{title}</Text>

      {rightButtonElement || <View />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#4B5159',
    paddingVertical: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DADADA',
  },
});
