import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, View, Modal, Alert } from 'react-native';

import { editComment } from '@api/index';

import CreateFeedModalTextInput from '@screens/HomeScreen/CreateFeedModal/CreateFeedModalTextInput';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';
import GSHeader from '@components/common/GSHeader';
import GSButton from '@components/common/GSButton';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

interface CommentEditModalProps {
  isVisible: boolean;
  prevComment: string;
  commentId: number;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setUpdateFeed: Dispatch<SetStateAction<boolean>>;
}

export default function CommentEditModal({
  isVisible,
  commentId,
  prevComment,
  setIsVisible,
  setUpdateFeed,
}: CommentEditModalProps) {
  const [feedContent, setFeedContent] = useState(prevComment);

  const handleCommentEditPress = async () => {
    if (feedContent === '') {
      Alert.alert('내용을 입력해주세요.');
      return;
    }
    await editComment(commentId, feedContent);
    setUpdateFeed(prev => !prev);
    setIsVisible(false);
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <SafeAreaLayout>
        <View style={styles.container}>
          <CommentEditModalHeader setIsVisible={setIsVisible} />
          <Spacer type="height" value={10} />
          <Spacer type="height" value={15} />
          <CreateFeedModalTextInput
            feedContent={feedContent}
            setFeedContent={setFeedContent}
          />
          <Spacer type="height" value={40} />
        </View>

        <GSButton buttonText="수정" onPress={handleCommentEditPress} />
      </SafeAreaLayout>
    </Modal>
  );
}

const CommentEditModalHeader = ({
  setIsVisible,
}: {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <GSHeader
      title="댓글 수정"
      leftComponent={<GSIcon name="close-outline" />}
      onLeftComponentPress={() => setIsVisible(false)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
