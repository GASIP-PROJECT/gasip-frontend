import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useSearchContext } from '@contexts/SearchContext';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';
import GSRadioButton from '@components/common/GSRadioButton';

import { COLORS } from '@styles/colors';
import { SEARCH_CATEGORY } from '../../../constants';
import { SearchCategoryType } from 'types/searchTypes';

import icon_x_circle from '@assets/icon_x_circle.png';

export default function SearchBar() {
  const [searchText, setSearchText] = useState<string>('');

  const { setNoSearchResult, handleSearchSubmit, searchCategory } =
    useSearchContext();

  const handleTextInputFocus = () => {
    setNoSearchResult(false);
  };

  const clearSearchText = () => {
    setSearchText('');
  };

  const onSubmit = async () => {
    console.log('submit!');
    await handleSearchSubmit(searchText);
  };

  return (
    <>
      <View>
        <TextInput
          style={styles.searchTextInput}
          placeholder=" 먼저 교수님 or 학과를 선택해주세요"
          placeholderTextColor={COLORS.GRAY_400}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={onSubmit}
          onFocus={handleTextInputFocus}
          value={searchText}
          autoFocus
        />

        {searchText !== '' && (
          <TouchableOpacity
            style={styles.searchIconContainer}
            hitSlop={{ top: 8, bottom: 8, right: 8, left: 8 }}
            onPress={clearSearchText}
          >
            <Image source={icon_x_circle} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        )}
      </View>

      <Spacer type="height" value={16} />

      <View style={{ flexDirection: 'row' }}>
        <SearchResultTypeSelector category={SEARCH_CATEGORY.PROFESSOR} />
        <Spacer type="width" value={10} />
        <SearchResultTypeSelector category={SEARCH_CATEGORY.MAJOR} />
      </View>
    </>
  );
}

const SearchResultTypeSelector = ({
  category,
}: {
  category: SearchCategoryType;
}) => {
  const { setSearchResults, searchCategory, setSearchCategory } =
    useSearchContext();

  const isSelected = category === searchCategory;

  const handleTypePress = () => {
    setSearchResults([]);
    setSearchCategory(category);
  };

  return (
    <View style={styles.searchResultTypeContainer}>
      <GSRadioButton isSelected={isSelected} onPress={handleTypePress} />
      <Spacer type="width" value={5} />
      <GSText style={styles.searchResultTypeText}>{category}</GSText>
    </View>
  );
};

const styles = StyleSheet.create({
  searchTextInput: {
    height: 52,
    borderRadius: 100,
    borderColor: COLORS.BLUE_LIGHT_100,
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    color: COLORS.BLACK,
    fontSize: 16,
    shadowColor: COLORS.BLUE_LIGHT_100,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  searchIconContainer: {
    position: 'absolute',
    right: 24,
    top: 14,
  },
  searchResultTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchResultTypeText: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.BLACK,
  },
});
