import React, { useContext, useRef, useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import axios from 'axios';

import { createFeed } from '@api/index';
import { NewFeedContext } from '@contexts/NewFeedContext';

import Spacer from '@components/common/Spacer';
import GSButton from '@components/common/GSButton';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import CategorySelectModal from './CategorySelectModal';
import FeedCategorySelector from './FeedCategorySelector';
import CreateFeedModalHeader from './CreateFeedModalHeader';
import CreateFeedModalPolicy from './CreateFeedModalPolicy';
import CreateFeedModalTextInput from './CreateFeedModalTextInput';

import { FEED_CATEGORIES } from '@constants';

export default function CreateFeedModal() {
  const {
    setToggleToUpdateFeedsList,
    showCreateFeedModal,
    setShowCreateFeedModal,
  } = useContext(NewFeedContext);
  const [feedContent, setFeedContent] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<
    FEED_CATEGORIES | string
  >(FEED_CATEGORIES.FREE);

  const categorySelectModalRef = useRef<ActionSheetRef>(null);

  const openCategorySelectModal = () => {
    categorySelectModalRef?.current?.show();
  };

  const handleCreateFeedPress = async () => {
    if (feedContent === '') {
      Alert.alert('내용을 입력해주세요.');
      return;
    }

    await createFeed(feedContent);
    setToggleToUpdateFeedsList(prev => !prev);
    setShowCreateFeedModal(false);
  };

  return (
    <Modal visible={showCreateFeedModal} animationType="slide">
      <SafeAreaLayout>
        <View style={styles.container}>
          <CreateFeedModalHeader feedContent={feedContent} />
          <Spacer type="height" value={10} />
          <FeedCategorySelector
            selectedCategory={selectedCategory}
            openCategorySelectModal={openCategorySelectModal}
          />
          <Spacer type="height" value={15} />
          <CreateFeedModalTextInput setFeedContent={setFeedContent} />
          <Spacer type="height" value={40} />
          {/* <CreateFeedModalPolicy /> */}
        </View>

        <GSButton buttonText="공유" onPress={handleCreateFeedPress} />
        <CategorySelectModal
          actionSheetRef={categorySelectModalRef}
          setSelectedCategory={setSelectedCategory}
        />
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
