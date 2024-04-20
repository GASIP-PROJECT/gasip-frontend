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
    // TODO - 테스트용 로그인 로직
    // const result = await axios.post('https://gasip.site/members/signup', {
    // const result = await axios.post('https://gasip.site/members/login', {
    //   email: 'ji@test.com',
    //   password: 'passwordtest1!',
    //   // name: '마지혁',
    // });
    // console.log(result.data);

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
