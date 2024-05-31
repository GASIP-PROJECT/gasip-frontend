import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

import useNewFeedStore from '@store/newFeedStore';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';

import icon_x_circle from '@assets/icon_x_circle.png';

export default function SelectedProfessorTag() {
  const profName = useNewFeedStore(state => state.profName);
  const resetProfData = useNewFeedStore(state => state.resetProfData);

  const handleXButtonPress = () => {
    resetProfData();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleXButtonPress}>
        <Image source={icon_x_circle} style={{ width: 18, height: 18 }} />
      </TouchableOpacity>
      <Spacer type="width" value={4} />
      <GSText style={styles.professorText}>{profName} 교수님</GSText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    height: 36,
    alignItems: 'center',
    borderColor: COLORS.BLUE_LIGHT_100,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginLeft: 24,
  },
  professorText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.BLUE_PRIMARY,
  },
});
