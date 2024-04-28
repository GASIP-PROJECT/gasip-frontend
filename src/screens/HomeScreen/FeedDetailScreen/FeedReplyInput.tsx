import React, { useState, Dispatch, SetStateAction, useRef } from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createComment, createCommentReply } from '@api/index';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';

interface FeedReplyInputProps {
  postId: number;
  replyCommentId: number | null;
  commentTextInputRef: React.RefObject<TextInput>;
  setUpdateFeed: Dispatch<SetStateAction<boolean>>;
  resetReplyCommentData: () => void;
}

export default function FeedReplyInput({
  postId,
  replyCommentId,
  commentTextInputRef,
  setUpdateFeed,
  resetReplyCommentData,
}: FeedReplyInputProps) {
  const { bottom: bottomSafeAreaPadding } = useSafeAreaInsets();

  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = async () => {
    if (newComment === '') return;

    if (commentTextInputRef.current) {
      Keyboard.dismiss();
      commentTextInputRef.current.blur();
      commentTextInputRef.current.clear();
    }

    if (replyCommentId) {
      // 대댓글
      await createCommentReply(postId, newComment, replyCommentId);
      resetReplyCommentData();
    } else {
      await createComment(postId, newComment);
    }

    setNewComment('');
    setUpdateFeed(prev => !prev);
  };

  return (
    <View style={[styles.container]}>
      {Platform.OS === 'ios' ? (
        <View>
          <TextInput
            ref={commentTextInputRef}
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
            ref={commentTextInputRef}
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
