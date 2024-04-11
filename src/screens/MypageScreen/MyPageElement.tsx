import React, { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MyPageElementProps {
  title: string;
  onPress?: (() => void) | null;
  rightButtonElement?: ReactElement | null;
}

export default function MyPageElement({
  title,
  onPress = null,
  rightButtonElement = null,
}: MyPageElementProps) {
  return (
    <TouchableOpacity style={styles.container}>
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
