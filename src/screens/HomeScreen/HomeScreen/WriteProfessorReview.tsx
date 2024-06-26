import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import useNeewFeedStore from '@store/newFeedStore';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import icon_write from '@assets/icon_write.png';

export default function WriteProfessorReview() {
  const openNewFeedModal = useNeewFeedStore(state => state.openNewFeedModal);

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, styles.buttonElevation, styles.buttonShadow]}
        onPress={openNewFeedModal}
      >
        <Image source={icon_write} style={styles.writeIcon} />
        <Spacer type="width" value={6} />
        <GSText style={styles.buttonText}>교수님 리뷰 작성하기</GSText>
      </TouchableOpacity>

      <Spacer type="height" value={8} />
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
    width: 18,
    height: 17,
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
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: COLORS.BLUE_PRIMARY,
    height: 56,
    flexDirection: 'row',
  },
  buttonShadow: {
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonElevation: {
    elevation: 3,
    elevationColor: COLORS.BLACK,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
});
