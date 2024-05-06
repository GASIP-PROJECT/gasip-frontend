import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { rateProfessor } from '@api/index';
import { useNewFeedContext } from '@contexts/NewFeedContext';

import ProfessorFeeds from './ProfessorFeeds';
import ProfessorDetail from './ProfessorDetail';
import ProfessorRateModal from './ProfessorRateModal';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import GSHeader from '@components/common/GSHeader';
import GSButton from '@components/common/GSButton';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

import icon_goback from '@assets/icon_goback.png';

export default function ProfessorDetailScreen({ route, navigation }) {
  const { bottom } = useSafeAreaInsets();
  const { professorData } = route.params;
  const { profId } = professorData;
  const [currentRating, setCurrentRating] = useState(3);
  const [isRateModalVisible, setIsRateModalVisible] = useState(false);
  const { openNewFeedModal } = useNewFeedContext();

  const openRateModal = () => {
    setIsRateModalVisible(true);
  };

  const rate = async () => {
    await rateProfessor(profId, currentRating);
    setIsRateModalVisible(false);
  };

  const handleWriteReviewPress = () => {
    openNewFeedModal(profId);
  };

  return (
    <SafeAreaLayout backgroundColor={COLORS.WHITE} noBottomPadding>
      <GSHeader
        title={'교수님 정보'}
        leftComponent={
          <Image source={icon_goback} style={{ width: 28, height: 28 }} />
        }
        onLeftComponentPress={navigation.goBack}
      />
      {/* 교수 상세 정보 */}
      <View style={styles.professorInfoContainer}>
        <GSText style={styles.introduceText}>
          가천대학교 교수님을 소개합니다 :)
        </GSText>
        <Spacer type="height" value={24} />
        <ProfessorDetail
          professorData={professorData}
          openRateModal={openRateModal}
        />
        <Spacer type="height" value={20} />
      </View>

      {/* 리뷰작성하기 버튼, 피드 목록 위에 렌더링 되도록 순서를 위로 땡겨옴 */}
      <View
        style={{
          paddingHorizontal: 16,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: bottom,
          width: '100%',
          zIndex: 100,
        }}
      >
        <GSButton
          buttonText="교수님 리뷰 작성하기 "
          onPress={handleWriteReviewPress}
          fontSize={16}
        />
      </View>

      <ProfessorFeeds profId={profId} />

      {/* 평점 입력 모달 */}
      <ProfessorRateModal
        currentRating={currentRating}
        setCurrentRating={setCurrentRating}
        rate={rate}
        isVisible={isRateModalVisible}
        setIsVisible={setIsRateModalVisible}
      />
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  professorInfoContainer: {
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BLUE_LIGHT_200,
  },
  reviewsContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'coral',
  },
  introduceText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.BLUE_PRIMARY,
  },
});
