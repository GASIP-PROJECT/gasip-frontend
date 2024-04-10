import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';

import { createFeed } from '@api/index';

import Spacer from '@components/common/Spacer';
import GSButton from '@components/common/GSButton';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import CreateFeedModalHeader from './CreateFeedModalHeader';
import CreateFeedModalPolicy from './CreateFeedModalPolicy';
import CreateFeedModalTextInput from './CreateFeedModalTextInput';

import { type CreateFeedModalProps } from '@screens/navigationTypes';

export default function CreateFeedModal({ navigation }: CreateFeedModalProps) {
  const [feedContent, setFeedContent] = useState('');

  const closeModal = () => {
    navigation.goBack();
  };

  const handleCreateFeedPress = async () => {
    // TODO - 테스트용 로그인 로직
    // const result = await axios.post('https://gasip.site/members/signup', {
    // const result = await axios.post('https://gasip.site/members/login', {
    //   email: 'ji@test.com',
    //   password: 'passwordtest1!',
    //   // name: '마지혁',
    // });
    // console.log(result.data);

    // TODO - 피드 작성 후에 Feed탭이 업데이트 되어야 함.
    await createFeed(feedContent);
    closeModal();
  };

  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <CreateFeedModalHeader feedContent={feedContent} />
        <Spacer type="height" value={23} />
        <CreateFeedModalTextInput setFeedContent={setFeedContent} />
        <Spacer type="height" value={40} />
        <CreateFeedModalPolicy />
      </View>

      <GSButton buttonText="공유" onPress={handleCreateFeedPress} />
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
