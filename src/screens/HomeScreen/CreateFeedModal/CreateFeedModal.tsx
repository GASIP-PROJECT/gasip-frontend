import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import axios from 'axios';

import useNewFeedStore from '@store/newFeedStore';
import { createFeed, createProfessorFeed } from '@api/index';
import { SearchContextProvider } from '@contexts/SearchContext';

import Spacer from '@components/common/Spacer';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import CreateFeedModalHeader from './CreateFeedModalHeader';
import CreateFeedModalPolicy from './CreateFeedModalPolicy';
import CreateFeedModalTextInput from './CreateFeedModalTextInput';
import SelectProfessorModal from './SelectProfessorModal';

export default function CreateFeedModal() {
  const [feedContent, setFeedContent] = useState('');
  const [isSelectProfessorModalVisible, setIsSelectProfessorModalVisible] =
    useState(false);
  const {
    showCreateFeedModal,
    profId,
    triggerFeedListUpdate,
    closeNewFeedModal,
    profName,
  } = useNewFeedStore();

  const handleCreateFeedPress = async () => {
    if (feedContent === '') {
      Alert.alert('내용을 입력해주세요.');
      return;
    }

    if (profId === null) {
      await createFeed(feedContent);
    } else {
      await createProfessorFeed(feedContent, profId);
    }

    triggerFeedListUpdate();
    closeNewFeedModal();
  };

  const resetStateOnDismiss = () => {
    setFeedContent('');
  };

  const openSelectProfessorModal = () => {
    setIsSelectProfessorModalVisible(true);
  };

  const closeSelectProfessorModal = () => {
    setIsSelectProfessorModalVisible(false);
  };

  return (
    <Modal
      visible={showCreateFeedModal}
      animationType="slide"
      onDismiss={resetStateOnDismiss}
    >
      <SafeAreaLayout>
        <View style={styles.container}>
          <CreateFeedModalHeader
            feedContent={feedContent}
            handleCreateFeedPress={handleCreateFeedPress}
          />
          <Spacer type="height" value={10} />
          <CreateFeedModalTextInput
            feedContent={feedContent}
            setFeedContent={setFeedContent}
            openSelectProfessorModal={openSelectProfessorModal}
          />
          <Spacer type="height" value={40} />
          {/* <CreateFeedModalPolicy /> */}
        </View>
      </SafeAreaLayout>
      <SearchContextProvider>
        <SelectProfessorModal
          isVisible={isSelectProfessorModalVisible}
          closeModal={closeSelectProfessorModal}
        />
      </SearchContextProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
