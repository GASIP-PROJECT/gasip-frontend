import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import GSIcon from '@components/common/GSIcon';

export default function ProfessorDetail() {
  const [showRateButton, setShowRateButton] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.professorNameContainer}>
        <Text style={styles.professorNameText}>김창복 교수님</Text>
        {!showRateButton && (
          <TouchableOpacity style={styles.rateProfessorButton}>
            <Text style={styles.rateProfessorButtonText}>평가하기</Text>
          </TouchableOpacity>
        )}
      </View>
      <Spacer type="height" value={20} />
      <DetailElement title="학부" content="사회과학대학" iconName="location" />
      <Spacer type="height" value={10} />
      <DetailElement
        title="학과"
        content="미디어커뮤니케이션학과"
        iconName="grid"
      />
      <Spacer type="height" value={10} />
      <DetailElement title="평점" content={3.57} iconName="star" />
    </View>
  );
}

const DetailElement = ({
  title,
  content,
  iconName,
}: {
  title: string;
  content: string | number;
  iconName: string;
}) => {
  return (
    <View style={styles.elementContainer}>
      <View style={styles.elementTitleContainer}>
        <GSIcon iconName={iconName} iconSize={20} />
        <Spacer type="width" value={5} />
        <Text style={styles.elementTitle}>{title}</Text>
      </View>
      <Spacer type="width" value={15} />
      <Text style={styles.elementContent}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#28292A',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  professorNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  professorNameText: {
    color: COLORS.WHITE,
    fontSize: 30,
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
    color: COLORS.WHITE,
    fontSize: 20,
    fontWeight: '700',
  },
  elementContent: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontWeight: '700',
  },
});
