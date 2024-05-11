import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, View, Modal, Alert } from 'react-native';

import { editFeed } from '@api/index';

import Spacer from '@components/common/Spacer';
import GSButton from '@components/common/GSButton';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import FeedEditModalHeader from './FeedEditModalHeader';
import CreateFeedModalTextInput from '@screens/HomeScreen/CreateFeedModal/CreateFeedModalTextInput';
import CreateFeedModalHeader from '../CreateFeedModal/CreateFeedModalHeader';

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
          <FeedEditModalHeader
            feedContent={feedContent}
            handleFeedEditPress={handleFeedEditPress}
            closeFeedEditModal={closeFeedEditModal}
          />

          <Spacer type="height" value={10} />
          <CreateFeedModalTextInput
            feedContent={feedContent}
            setFeedContent={setFeedContent}
          />
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
});
