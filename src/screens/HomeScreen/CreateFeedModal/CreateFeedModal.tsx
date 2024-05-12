import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import axios from 'axios';

import useNewFeedStore from '@store/newFeedStore';
import { createFeed, createProfessorFeed } from '@api/index';

import Spacer from '@components/common/Spacer';
import GSButton from '@components/common/GSButton';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import CategorySelectModal from './CategorySelectModal';
import CreateFeedModalHeader from './CreateFeedModalHeader';
import CreateFeedModalPolicy from './CreateFeedModalPolicy';
import CreateFeedModalTextInput from './CreateFeedModalTextInput';

export interface SelectedCategory {
  category: string;
  profId?: number | null;
}

export default function CreateFeedModal() {
  const showCreateFeedModal = useNewFeedStore(
    state => state.showCreateFeedModal,
  );
  const triggerFeedListUpdate = useNewFeedStore(
    state => state.triggerFeedListUpdate,
  );
  const closeNewFeedModal = useNewFeedStore(state => state.closeNewFeedModal);
  const selectedProfData = useNewFeedStore(state => state.selectedProfData);

  const { id, name } = selectedProfData;

  const [feedContent, setFeedContent] = useState('');

  const handleCreateFeedPress = async () => {
    if (feedContent === '') {
      Alert.alert('내용을 입력해주세요.');
      return;
    }

    if (id === null) {
      await createFeed(feedContent);
    } else {
      await createProfessorFeed(feedContent, id);
    }

    triggerFeedListUpdate();
    closeNewFeedModal();
  };

  const resetStateOnDismiss = () => {
    setFeedContent('');
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
          />
          <Spacer type="height" value={40} />
          {/* <CreateFeedModalPolicy /> */}
        </View>

        {/* <CategorySelectModal
          actionSheetRef={categorySelectModalRef}
          setSelectedCategory={setSelectedCategory}
        /> */}
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
