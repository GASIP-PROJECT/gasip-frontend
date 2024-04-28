import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { COLORS } from '@styles/colors';

interface CreateFeedModalTextInputProps {
  feedContent: string;
  setFeedContent: Dispatch<SetStateAction<string>>;
}

export default function CreateFeedModalTextInput({
  feedContent,
  setFeedContent,
}: CreateFeedModalTextInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={feedContent}
        style={styles.textInput}
        placeholder="자유롭게 의견을 작성해 주세요.."
        placeholderTextColor={'#7d7878'}
        multiline
        maxLength={500}
        onChangeText={text => setFeedContent(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    borderColor: 'white',
    padding: 10,
    color: COLORS.WHITE,
    textAlignVertical: 'top',
    lineHeight: 23,
  },
});
