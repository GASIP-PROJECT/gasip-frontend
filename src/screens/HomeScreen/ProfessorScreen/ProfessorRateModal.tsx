import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import GSButton from '@components/common/GSButton';

import { COLORS } from '@styles/colors';

interface ProfessorRateModalProps {
  currentRating: number;
  setCurrentRating: Dispatch<SetStateAction<number>>;
  rate: () => void;
  editRating: () => void;
  isFirstRating: boolean;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export default function ProfessorRateModal({
  currentRating,
  setCurrentRating,
  rate,
  editRating,
  isFirstRating,
  isVisible,
  setIsVisible,
}: ProfessorRateModalProps) {
  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      backdropOpacity={0.7}
      backdropColor={COLORS.GRAY_200}
    >
      <View style={styles.rateActionSheetContainer}>
        <View style={styles.contentContainer}>
          <Spacer type="height" value={15} />

          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={closeModal}>
              <GSIcon name="close-outline" size={30} color={COLORS.GRAY_400} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <GSText style={styles.titleText}>평점을 입력해주세요</GSText>
            </View>
            <View style={{ width: 30 }} />
          </View>

          <GSText style={styles.infoText}>
            평점은 나중에 수정할 수 있어요 :)
          </GSText>

          <Spacer type="height" value={20} />

          {/* TODO - 파란 선 더 나은 코드 필요 */}
          {/* 문제 - 85퍼센트, 재사용 불가능성 등 */}
          <View
            style={{
              height: 1,
              width: '85%',
              borderBottomColor: COLORS.BLUE_LIGHT_200,
              borderBottomWidth: 1,
            }}
          />

          <Spacer type="height" value={32} />

          {/* 평점 숫자 및 별 UI */}
          <View style={styles.ratingContainer}>
            <GSText style={styles.currentRatingText}>{currentRating}.0</GSText>
            <Spacer type="width" value={36} />
            <RatingStar
              currentRating={currentRating}
              setCurrentRating={setCurrentRating}
              compareRating={1}
            />
            <RatingStar
              currentRating={currentRating}
              setCurrentRating={setCurrentRating}
              compareRating={2}
            />
            <RatingStar
              currentRating={currentRating}
              setCurrentRating={setCurrentRating}
              compareRating={3}
            />
            <RatingStar
              currentRating={currentRating}
              setCurrentRating={setCurrentRating}
              compareRating={4}
            />
            <RatingStar
              currentRating={currentRating}
              setCurrentRating={setCurrentRating}
              compareRating={5}
            />
          </View>

          <Spacer type="height" value={20} />
        </View>

        <Spacer type="height" value={32} />

        {/* 등록하기버튼 */}
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <GSButton
            buttonText="제출하기"
            onPress={isFirstRating ? rate : editRating}
            fontSize={20}
          />
        </View>
      </View>
    </Modal>
  );
}

const RatingStar = ({ currentRating, setCurrentRating, compareRating }) => {
  if (currentRating >= compareRating) {
    return (
      <TouchableOpacity onPress={() => setCurrentRating(compareRating)}>
        <GSIcon name="star" size={32} color="#ffc400" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={() => setCurrentRating(compareRating)}>
      <GSIcon name="star" size={32} color={COLORS.GRAY_400} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rateActionSheetContainer: {
    backgroundColor: 'transparent',
  },
  contentContainer: {
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    borderRadius: 20,
  },
  titleContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.GRAY_400,
  },
  currentRatingText: {
    fontSize: 24,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
