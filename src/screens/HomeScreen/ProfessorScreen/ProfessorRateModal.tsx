import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';
import GSButton from '@components/common/GSButton';

import { COLORS } from '@styles/colors';

interface ProfessorRateModalProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
  currentRating: number;
  setCurrentRating: React.Dispatch<React.SetStateAction<number>>;
  rate: () => void;
}

export default function ProfessorRateModal({
  actionSheetRef,
  currentRating,
  setCurrentRating,
  rate,
}: ProfessorRateModalProps) {
  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={styles.rateActionSheetContainer}
    >
      <Spacer type="height" value={15} />
      <Text
        style={{
          fontSize: 20,
          color: COLORS.WHITE,
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        교수님의 평점을 등록해주세요.
      </Text>
      <Spacer type="height" value={15} />
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <RatingStar
          currentRating={currentRating}
          setCurrentRating={setCurrentRating}
          compareRating={1}
        />
        <Spacer type="width" value={5} />
        <RatingStar
          currentRating={currentRating}
          setCurrentRating={setCurrentRating}
          compareRating={2}
        />
        <Spacer type="width" value={5} />
        <RatingStar
          currentRating={currentRating}
          setCurrentRating={setCurrentRating}
          compareRating={3}
        />
        <Spacer type="width" value={5} />
        <RatingStar
          currentRating={currentRating}
          setCurrentRating={setCurrentRating}
          compareRating={4}
        />
        <Spacer type="width" value={5} />
        <RatingStar
          currentRating={currentRating}
          setCurrentRating={setCurrentRating}
          compareRating={5}
        />
      </View>
      <Spacer type="height" value={20} />
      <GSButton buttonText="등록하기" onPress={rate} />
    </ActionSheet>
  );
}

const RatingStar = ({ currentRating, setCurrentRating, compareRating }) => {
  if (currentRating >= compareRating) {
    return (
      <TouchableOpacity onPress={() => setCurrentRating(compareRating)}>
        <GSIcon name="star" size={50} color="#ffcd00" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={() => setCurrentRating(compareRating)}>
      <GSIcon name="star-outline" size={50} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rateActionSheetContainer: {
    backgroundColor: '#28292A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
