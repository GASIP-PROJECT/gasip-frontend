import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { createFeed, createProfessorFeed, getProfessorData } from '@api/index';
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
  const navigation = useNavigation();

  const [feedContent, setFeedContent] = useState('');
  const [isSelectProfessorModalVisible, setIsSelectProfessorModalVisible] =
    useState(false);
  const {
    profId,
    profName,
    showCreateFeedModal,
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
      const professorData = await getProfessorData(profId);

      updateFeedListAndCloseModal();
      // 해당 교수님 상세화면으로 이동
      navigation.navigate('ProfessorDetailScreen', {
        professorData: professorData,
      });
    } else {
      // 일반 피드인 경우
      await createFeed(feedContent);
      updateFeedListAndCloseModal();
    }
  };

  // TODO - 이런 식으로 업데이트를 trigger하는 것이 좋은 선택인지에 대해서 생각해봐야함.
  const updateFeedListAndCloseModal = () => {
    triggerFeedListUpdate(); // 새롭게 추가된 피드를 반영하기 위해서 피드 목록 업데이트 처리
    closeModal();
  };

  const resetFeedContent = () => {
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
    resetFeedContent();
    closeNewFeedModal();
  };

  return (
    <Modal visible={showCreateFeedModal} animationType="slide">
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
