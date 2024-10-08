import React, { useState, useEffect } from 'react';
import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createComment, createCommentReply } from '@api/index';

import useCommentEditStore from '@store/commentEditStore';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';

import icon_plane_right from '@assets/icon_plane_right.png';

interface FeedReplyInputProps {
  postId: number;
  replyCommentId: number | null;
  commentTextInputRef: React.RefObject<TextInput>;
  resetReplyCommentData: () => void;
}

export default function FeedReplyInput({
  postId,
  replyCommentId,
  commentTextInputRef,
  resetReplyCommentData,
}: FeedReplyInputProps) {
  const { bottom: bottomSafeAreaPadding } = useSafeAreaInsets();
  const toggleUpdateFeed = useCommentEditStore(state => state.toggleUpdateFeed);

  const [newComment, setNewComment] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
    toggleUpdateFeed();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={{ height: isKeyboardVisible ? 56 : 90 }}>
      {Platform.OS === 'ios' ? (
        <View style={styles.textInputContainer}>
          <Spacer type="width" value={20} />
          <TextInput
            ref={commentTextInputRef}
            style={styles.textInput}
            placeholder="댓글을 입력해주세요."
            placeholderTextColor={COLORS.GRAY_400}
            onChangeText={text => setNewComment(text)}
            value={newComment}
          />

          <Spacer type="width" value={10} />

          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              onPress={handleCommentSubmit}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Image
                source={icon_plane_right}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>

          <Spacer type="width" value={10} />
        </View>
      ) : (
        <View style={styles.textInputContainer}>
          <Spacer type="width" value={20} />
          <TextInput
            ref={commentTextInputRef}
            style={styles.textInput}
            placeholder="댓글을 입력해주세요."
            placeholderTextColor={COLORS.GRAY_400}
            onChangeText={text => setNewComment(text)}
            onSubmitEditing={handleCommentSubmit}
          />

          <Spacer type="width" value={10} />

          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              onPress={handleCommentSubmit}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Image
                source={icon_plane_right}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>

          <Spacer type="width" value={10} />
        </View>
      )}

      {!isKeyboardVisible && (
        <Spacer type="height" value={bottomSafeAreaPadding} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // TODO: 안드로이드에서 font가 잘리는 케이스
  textInputContainer: {
    height: Platform.OS === 'android' ? 45 : 40,
    borderRadius: 20,
    borderColor: COLORS.BLUE_LIGHT_100,
    borderWidth: 1,
    flexDirection: 'row',
  },
  textInput: {
    fontFamily: 'Pretendard',
    flex: 1,
    height: '100%',
    fontSize: 16,
    textAlignVertical: 'center',
    fontWeight: '400',
    fontStyle: 'normal',
    color: COLORS.BLACK,
  },
  submitButtonContainer: {
    justifyContent: 'center',
  },
});
