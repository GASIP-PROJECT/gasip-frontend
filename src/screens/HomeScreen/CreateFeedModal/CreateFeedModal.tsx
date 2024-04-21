import React, { useContext, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import axios from 'axios';

import { createFeed } from '@api/index';
import { NewFeedContext } from '@contexts/NewFeedContext';

import Spacer from '@components/common/Spacer';
import GSButton from '@components/common/GSButton';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import CreateFeedModalHeader from './CreateFeedModalHeader';
import CreateFeedModalPolicy from './CreateFeedModalPolicy';
import CreateFeedModalTextInput from './CreateFeedModalTextInput';

export default function CreateFeedModal() {
  const {
    setToggleToUpdateFeedsList,
    showCreateFeedModal,
    setShowCreateFeedModal,
  } = useContext(NewFeedContext);
  const [feedContent, setFeedContent] = useState('');

  const handleCreateFeedPress = async () => {
    await createFeed(feedContent);
    setToggleToUpdateFeedsList(prev => !prev);
    setShowCreateFeedModal(false);
  };

  return (
    <Modal visible={showCreateFeedModal} animationType="slide">
      <SafeAreaLayout>
        <View style={styles.container}>
          <CreateFeedModalHeader feedContent={feedContent} />
          <Spacer type="height" value={23} />
          <CreateFeedModalTextInput setFeedContent={setFeedContent} />
          <Spacer type="height" value={40} />
          {/* <CreateFeedModalPolicy /> */}
        </View>

        <GSButton buttonText="공유" onPress={handleCreateFeedPress} />
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
