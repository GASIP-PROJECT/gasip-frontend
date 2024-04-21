import React, { useState, Dispatch, SetStateAction, useRef } from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createComment } from '@api/index';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';

interface FeedReplyInputProps {
  postId: number;
  setUpdateFeed: Dispatch<SetStateAction<boolean>>;
}

export default function FeedReplyInput({
  postId,
  setUpdateFeed,
}: FeedReplyInputProps) {
  const textInputRef = useRef<TextInput>(null);
  const { bottom: bottomSafeAreaPadding } = useSafeAreaInsets();

  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = async () => {
    if (newComment === '') return;

    if (textInputRef.current) {
      Keyboard.dismiss();
      textInputRef.current.blur();
      textInputRef.current.clear();
    }

    setNewComment('');
    await createComment(postId, newComment);
    setUpdateFeed(prev => !prev);
  };

  return (
    <View style={[styles.container]}>
      {Platform.OS === 'ios' ? (
        <View>
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            placeholder="댓글을 입력해주세요."
            placeholderTextColor={'#ffffff'}
            onChangeText={text => setNewComment(text)}
            onSubmitEditing={handleCommentSubmit}
          />

          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleCommentSubmit}
            >
              <GSIcon name="arrow-up-outline" size={20} color={COLORS.WHITE} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            placeholder="댓글을 입력해주세요."
            placeholderTextColor={'#ffffff'}
            onChangeText={text => setNewComment(text)}
            onSubmitEditing={handleCommentSubmit}
          />

          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleCommentSubmit}
            >
              <GSIcon name="arrow-up-outline" size={20} color={COLORS.WHITE} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Spacer type="height" value={bottomSafeAreaPadding} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: '#3e3b3b',
    paddingHorizontal: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#545151',
    paddingHorizontal: 20,
    color: '#ffffff',
    fontSize: 16,
    textAlignVertical: 'center',
  },
  submitButtonContainer: {
    position: 'absolute',
    right: 0,
    height: '100%',
    padding: 5,
  },
  submitButton: {
    flex: 1,
    backgroundColor: COLORS.BTN_MAIN,
    width: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
