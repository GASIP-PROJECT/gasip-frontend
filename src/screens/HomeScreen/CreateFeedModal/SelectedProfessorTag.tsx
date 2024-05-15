import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import useNewFeedStore from '@store/newFeedStore';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';

import icon_search from '@assets/icon_search.png';

export default function SelectedProfessorTag() {
  const profName = useNewFeedStore(state => state.profName);

  return (
    <View style={styles.container}>
      <Image source={icon_search} style={{ width: 18, height: 18 }} />
      <Spacer type="width" value={4} />
      <GSText style={styles.professorText}>{profName} 교수님</GSText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
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
