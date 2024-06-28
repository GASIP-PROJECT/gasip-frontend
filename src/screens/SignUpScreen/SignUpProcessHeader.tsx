import React from 'react';
import { Image, StyleSheet } from 'react-native';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import GSHeader from '@components/common/GSHeader';

import { COLORS } from '@styles/colors';

import icon_goback from '@assets/icon_goback.png';

interface SignUpProcessHeaderProps {
  step: number;
  onBackButtonPress: () => void;
}

export default function SignUpProcessHeader({
  step,
  onBackButtonPress,
}: SignUpProcessHeaderProps) {
  return (
    <>
      <GSHeader
        title={'회원가입하기'}
        leftComponent={
          <Image source={icon_goback} style={{ width: 28, height: 28 }} />
        }
        onLeftComponentPress={onBackButtonPress}
        paddingHorizontal={0}
      />
      <GSText style={styles.stepText}>{step}/3</GSText>
      <Spacer type="height" value={28} />
    </>
  );
}

const styles = StyleSheet.create({
  stepText: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.GRAY_500,
    alignSelf: 'center',
  },
});
