import React from 'react';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getProfessorData } from '@api/index';

import ProfNameButton from './ProfNameButton';
import Spacer from '@components/common/Spacer';
import GSHeader from '@components/common/GSHeader';

import { COLORS } from '@styles/colors';
import icon_goback from '@assets/icon_goback.png';

interface FeedHeaderProps {
  memberNickname: string;
  profName: string;
  profId: number;
}

export default function FeedHeader({
  memberNickname,
  profName,
  profId,
}: FeedHeaderProps) {
  const navigation = useNavigation();

  const handleProfNamePress = async () => {
    if (profId === undefined) return;

    const professorData = await getProfessorData(profId);

    navigation.navigate('ProfessorDetailScreen', {
      professorData: professorData,
    });
  };

  return (
    <View style={{ paddingHorizontal: 24 }}>
      <GSHeader
        title={`${memberNickname} 님의 게시글` || ''}
        leftComponent={
          <Image source={icon_goback} style={{ width: 28, height: 28 }} />
        }
        onLeftComponentPress={navigation.goBack}
        paddingHorizontal={0}
        rightComponent={<View style={{ width: 28, height: 28 }} />}
      />

      {/* 교수님에 대한 글인 경우 표시되는 교수님 이름 */}
      {profId !== 0 && (
        <ProfNameButton name={profName} onPress={handleProfNamePress} />
      )}

      <Spacer type="height" value={14} />

      <BottomDivider />
    </View>
  );
}

// 컴포넌트가 크기가 작고, 여기서만 사용되는 Divider이기 때문에 컴포넌트 안에서 분리
const BottomDivider = () => {
  return <View style={{ height: 1, backgroundColor: COLORS.GRAY_100 }} />;
};
