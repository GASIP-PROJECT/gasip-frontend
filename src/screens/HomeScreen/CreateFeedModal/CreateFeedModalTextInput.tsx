import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import useNewFeedStore from '@store/newFeedStore';

import { COLORS } from '@styles/colors';

interface CreateFeedModalTextInputProps {
  feedContent: string;
  setFeedContent: Dispatch<SetStateAction<string>>;
  openSelectProfessorModal?: () => void;
}

export default function CreateFeedModalTextInput({
  feedContent,
  setFeedContent,
  openSelectProfessorModal = () => {},
}: CreateFeedModalTextInputProps) {
  const profId = useNewFeedStore(state => state.profId);

  return (
    <View style={styles.container}>
      {profId === null && (
        <TouchableOpacity
          onPress={openSelectProfessorModal}
          style={styles.openSelectProfessorModalCover}
        />
      )}
      <TextInput
        value={feedContent}
        style={styles.textInput}
        placeholder="여러분의 자유로운 의견을 들려주세요."
        placeholderTextColor={COLORS.GRAY_400}
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
    fontSize: 14,
    borderColor: 'white',
    padding: 10,
    textAlignVertical: 'top',
    lineHeight: 20,
  },
  openSelectProfessorModalCover: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    top: 0,
    left: 16,
    zIndex: 1,
  },
});
