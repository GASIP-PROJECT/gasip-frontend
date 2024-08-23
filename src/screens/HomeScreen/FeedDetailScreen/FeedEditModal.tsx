import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, View, Modal, Alert, TextInput } from 'react-native';

import { editFeed } from '@api/index';

import useCommentEditStore from '@store/commentEditStore';

import Spacer from '@components/common/Spacer';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import FeedActionModalHeader from './FeedActionModalHeader';

import { COLORS } from '@styles/colors';

interface FeedEditModalProps {
  isVisible: boolean;
  prevContent: string;
  postId: number;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export default function FeedEditModal({
  isVisible,
  prevContent,
  postId,
  setIsVisible,
}: FeedEditModalProps) {
  const [feedContent, setFeedContent] = useState('');
  const toggleUpdateFeed = useCommentEditStore(state => state.toggleUpdateFeed);

  const handleFeedEditPress = async () => {
    if (feedContent === '') {
      Alert.alert('내용을 입력해주세요.');
      return;
    }
    await editFeed(postId, feedContent);

    toggleUpdateFeed();
    setIsVisible(false);
  };

  const closeFeedEditModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      setFeedContent(prevContent);
    }
  }, [isVisible]);

  return (
    <Modal visible={isVisible} animationType="slide">
      <SafeAreaLayout>
        <View style={styles.container}>
          <FeedActionModalHeader
            title="게시글 수정하기"
            feedContent={feedContent}
            handleActionButtonPress={handleFeedEditPress}
            closeModal={closeFeedEditModal}
            showLetterCount
          />

          <Spacer type="height" value={10} />
          <View style={styles.textInputContainer}>
            <TextInput
              value={feedContent}
              style={styles.textInput}
              placeholder={`여러분의 자유로운 의견을 들려주세요.\n\n부적절하거나 불쾌감을 줄 수 있는 컨텐츠는 제재를 받을 수 있습니다.`}
              placeholderTextColor={COLORS.GRAY_400}
              multiline
              maxLength={500}
              onChangeText={text => setFeedContent(text)}
            />
          </View>
          <Spacer type="height" value={40} />
        </View>
      </SafeAreaLayout>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInputContainer: {
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
    color: COLORS.BLACK,
  },
});
