import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert } from 'react-native';

import Spacer from '@components/common/Spacer';
import GSButton from '@components/common/GSButton';
import SafeAreaLayout from '@components/common/SafeAreaLayout';
import { editFeed } from '@api/index';
import CreateFeedModalTextInput from '@screens/HomeScreen/CreateFeedModal/CreateFeedModalTextInput';
import FeedEditModalHeader from './FeedEditModalHeader';

interface FeedEditModalProps {
  isVisible: boolean;
  prevContent: string;
  postId: number;
  setUpdateFeed: Dispatch<SetStateAction<boolean>>;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export default function FeedEditModal({
  isVisible,
  prevContent,
  postId,
  setUpdateFeed,
  setIsVisible,
}: FeedEditModalProps) {
  const [feedContent, setFeedContent] = useState('');

  const handleFeedEditPress = async () => {
    if (feedContent === '') {
      Alert.alert('내용을 입력해주세요.');
      return;
    }
    await editFeed(postId, feedContent);

    setUpdateFeed(prev => !prev);
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
          <FeedEditModalHeader
            feedContent={feedContent}
            setIsVisible={setIsVisible}
          />
          <Spacer type="height" value={10} />
          <Spacer type="height" value={15} />
          <CreateFeedModalTextInput
            feedContent={feedContent}
            setFeedContent={setFeedContent}
          />
          <Spacer type="height" value={40} />
        </View>

        <GSButton buttonText="수정" onPress={handleFeedEditPress} />
      </SafeAreaLayout>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
