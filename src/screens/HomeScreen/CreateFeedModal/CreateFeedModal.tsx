import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';

import { createFeed, createProfessorFeed } from '@api/index';
import { SearchContextProvider } from '@contexts/SearchContext';
import useNewFeedStore from '@store/newFeedStore';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import SelectedProfessorTag from './SelectedProfessorTag';
import SelectProfessorModal from './SelectProfessorModal';
import CreateFeedModalHeader from './CreateFeedModalHeader';
import CreateFeedModalPolicy from './CreateFeedModalPolicy';
import CreateFeedModalTextInput from './CreateFeedModalTextInput';

import { COLORS } from '@styles/colors';

export default function CreateFeedModal() {
  const [feedContent, setFeedContent] = useState('');
  const [isSelectProfessorModalVisible, setIsSelectProfessorModalVisible] =
    useState(false);
  const {
    profId,
    profName,
    showCreateFeedModal,
    isFreeFeed,
    closeNewFeedModal,
    triggerFeedListUpdate,
    setIsFreeFeed,
  } = useNewFeedStore();

  // TODO - 함수 로직 벗어나는 케이스 없는지 검증 필요
  const handleCreateFeedPress = async () => {
    if (feedContent === '') {
      Alert.alert('내용을 입력해주세요.');
      return;
    }

    if (profId !== null) {
      // 교수님 리뷰인 경우
      await createProfessorFeed(feedContent, profId);
      triggerFeedListUpdate();
      closeModal();
    } else {
      // 일반 피드인 경우
      await createFeed(feedContent);
      triggerFeedListUpdate();
      closeModal();
    }
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

  const closeModal = () => {
    setIsFreeFeed(false);
    closeNewFeedModal();
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
            handleCreateFeedPress={handleCreateFeedPress}
            closeModal={closeModal}
          />
          {profName !== '' && (
            <>
              <Spacer type="height" value={10} />
              <SelectedProfessorTag />
            </>
          )}
          <View style={{ paddingHorizontal: 24, width: '100%' }}>
            <GSText style={styles.letterCountText}>
              {feedContent.length}/500
            </GSText>
          </View>
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
  letterCountText: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.GRAY_400,
    alignSelf: 'flex-end',
  },
});
