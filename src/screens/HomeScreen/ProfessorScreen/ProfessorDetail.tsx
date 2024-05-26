import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import RatingStars from './RatingStars';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';

import { COLORS } from '@styles/colors';
import { Professor } from 'types/searchTypes';

import icon_pencil from '@assets/icon_pencil.png';

export default function ProfessorDetail({
  professorData,
  openRateModal,
}: {
  professorData: Professor;
  openRateModal: () => void;
}) {
  const {
    profName,
    collegeName,
    majorName,
    professorAverageGradePoint,
    isGrade,
  } = professorData;

  return (
    <View>
      <View style={styles.professorNameContainer}>
        <GSText style={styles.professorNameText}>{profName} 교수님</GSText>
      </View>
      <Spacer type="height" value={20} />
      <DetailElement title="학부" content={collegeName} />
      <Spacer type="height" value={10} />
      <DetailElement title="학과" content={majorName} />
      <Spacer type="height" value={10} />
      <View style={styles.professorRatingContainer}>
        <DetailElement
          title="평점"
          content={
            professorAverageGradePoint !== 'null'
              ? professorAverageGradePoint
              : '아직 등록된 평점이 없습니다.'
          }
        />
        <Spacer type="width" value={8} />
        <View style={styles.ratingStarAndButtonContainer}>
          {professorAverageGradePoint !== 'null' && (
            <RatingStars currentRating={professorAverageGradePoint} />
          )}
          {!isGrade && (
            <TouchableOpacity style={styles.rateButton} onPress={openRateModal}>
              <GSText style={styles.rateButtonText}>평점 입력하기</GSText>
              <Image source={icon_pencil} style={{ width: 18, height: 18 }} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const DetailElement = ({
  title,
  content,
}: {
  title: string;
  content: string | number;
}) => {
  return (
    <View style={styles.elementContainer}>
      <View style={styles.elementTitleContainer}>
        <Spacer type="width" value={5} />
        <GSText style={styles.elementTitle}>{title}</GSText>
      </View>
      <Spacer type="width" value={10} />
      <GSText style={styles.elementContent}>{content}</GSText>
    </View>
  );
};

const styles = StyleSheet.create({
  professorNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  professorNameText: {
    fontSize: 26,
    fontWeight: '700',
  },
  rateProfessorButton: {
    height: 30,
    paddingHorizontal: 20,
    backgroundColor: COLORS.BTN_MAIN,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateProfessorButtonText: {
    color: COLORS.WHITE,
    fontSize: 15,
    fontWeight: '700',
  },
  elementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  elementTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  elementTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_400,
  },
  elementContent: {
    fontSize: 14,
    fontWeight: '500',
  },
  professorRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStarAndButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateButton: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    alignItems: 'center',
    height: 28,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.BLUE_PRIMARY,
  },
  rateButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.BLUE_PRIMARY,
  },
});
