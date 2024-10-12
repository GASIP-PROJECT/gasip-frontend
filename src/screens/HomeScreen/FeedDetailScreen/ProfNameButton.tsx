import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { getProfessorData } from '@api/index';

import GSText from '@components/common/GSText';

import { COLORS } from '@styles/colors';

import { type RootStackParamList } from '@navigators/RootStack/Root';

interface ProfNameButtonProps {
  name: string;
  id: number;
}

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProfessorDetailScreen'
>;

// TODO - name, id 값 및 관련 데이터가 제대로 처리되지 않는 경우에 대한 처리 필요
export default function ProfNameButton({ name, id }: ProfNameButtonProps) {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleProfNamePress = async () => {
    if (id === undefined) return;

    const professorData = await getProfessorData(id);

    navigation.navigate('ProfessorDetailScreen', {
      professorData: professorData,
    });
  };

  return (
    <TouchableOpacity
      onPress={handleProfNamePress}
      style={styles.professorNameButton}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <GSText style={styles.professorNameText}>{name} 교수님</GSText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  professorNameButton: {
    backgroundColor: 'coral',
    alignSelf: 'center',
  },
  professorNameText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.BLUE_PRIMARY,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});
