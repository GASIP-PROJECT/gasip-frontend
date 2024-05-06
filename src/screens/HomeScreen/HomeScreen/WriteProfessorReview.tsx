import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';
import GSButton from '@components/common/GSButton';

import { COLORS } from '@styles/colors';
import icon_write from '@assets/icon_write.png';

export default function WriteProfessorReview() {
  const handleWriteReviewPress = () => {};
  return (
    <View>
      <GSText style={styles.titleText}>교수님 리뷰 작성하기</GSText>
      <Spacer type="height" value={10} />
      <View
        style={[
          styles.buttonContainer,
          styles.buttonContainerElevation,
          styles.buttonContainerShadow,
        ]}
      >
        <Image source={icon_write} style={styles.writeIcon} />
        <Spacer type="height" value={18} />
        <GSButton
          buttonText="작성하기"
          onPress={handleWriteReviewPress}
          height={40}
        />
      </View>
      <Spacer type="height" value={6} />
      <GSText style={styles.askForReviewText}>
        가천대 학생분들의 소중한 의견이 모여 교수님 리뷰가 정확해져요 :)
      </GSText>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
  },
  buttonContainerShadow: {
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  buttonContainerElevation: {
    elevation: 4,
    shadowColor: COLORS.BLACK,
    zIndex: 99,
  },
  writeIcon: {
    width: 68,
    height: 64,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  askForReviewText: {
    fontSize: 10,
    color: COLORS.GRAY_400,
    fontWeight: '400',
    alignSelf: 'center',
  },
});
