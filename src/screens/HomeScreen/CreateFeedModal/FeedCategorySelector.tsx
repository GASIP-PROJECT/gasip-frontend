import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import GSIcon from '@components/common/GSIcon';

import { COLORS } from '@styles/colors';
import { SelectedCategory } from './CreateFeedModal';

export default function FeedCategorySelector({
  selectedCategory,
  openCategorySelectModal,
}: {
  selectedCategory: SelectedCategory;
  openCategorySelectModal: () => void;
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectorContainer}
        onPress={openCategorySelectModal}
      >
        <Text style={styles.selectorText}>{selectedCategory.category}</Text>
        <GSIcon name="chevron-down" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
  },
  selectorContainer: {
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 20,
    borderColor: COLORS.WHITE,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  selectorText: {
    color: COLORS.WHITE,
    fontSize: 16,
    marginRight: 5,
  },
});
