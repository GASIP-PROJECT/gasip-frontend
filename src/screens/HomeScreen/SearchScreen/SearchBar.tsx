import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { searchFeeds, searchProfessors } from '@api/index';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import GSRadioButton from '@components/common/GSRadioButton';

import { COLORS } from '@styles/colors';
import { type SearchResult } from 'types/searchTypes';

import icon_x_circle from '@assets/icon_x_circle.png';

export default function SearchBar({
  setSearchResults,
  setNoSearchResult,
  searchResultType,
  setSearchResultType,
}: {
  setSearchResults: Dispatch<SetStateAction<SearchResult[]>>;
  setNoSearchResult: Dispatch<SetStateAction<boolean>>;
  searchResultType: '교수님' | '학부/학과';
  setSearchResultType: Dispatch<SetStateAction<'교수님' | '학부/학과'>>;
}) {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchSubmit = async () => {
    if (searchResultType === '교수님') {
      const professors = await searchProfessors(searchText);
      if (professors.length === 0) {
        setNoSearchResult(true);
      } else {
        setNoSearchResult(false);
      }
      setSearchResults([...professors]);
    }

    if (searchResultType === '학부/학과') {
      const feeds = await searchFeeds(searchText);
      if (feeds.length === 0) {
        setNoSearchResult(true);
      } else {
        setNoSearchResult(false);
      }
      setSearchResults([...feeds]);
    }
  };

  const handleTextInputFocus = () => {
    setNoSearchResult(false);
  };

  return (
    <>
      <View>
        <TextInput
          style={styles.searchTextInput}
          placeholder=" 먼저 교수님 or 학과를 선택해주세요"
          placeholderTextColor={COLORS.GRAY_400}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={handleSearchSubmit}
          onFocus={handleTextInputFocus}
          autoFocus
        />

        <TouchableOpacity
          style={styles.searchIconContainer}
          hitSlop={{ top: 8, bottom: 8, right: 8, left: 8 }}
        >
          <Image source={icon_x_circle} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>

      <Spacer type="height" value={16} />

      <View style={{ flexDirection: 'row' }}>
        <SearchResultTypeSelector
          typeName="교수님"
          searchResultType={searchResultType}
          setSearchResultType={setSearchResultType}
          setSearchResults={setSearchResults}
        />
        <Spacer type="width" value={10} />
        <SearchResultTypeSelector
          typeName="학부/학과"
          searchResultType={searchResultType}
          setSearchResultType={setSearchResultType}
          setSearchResults={setSearchResults}
        />
      </View>
    </>
  );
}

interface SearchResultTypeSelectorProps {
  typeName: '교수님' | '학부/학과';
  searchResultType: 'Professor' | 'Content';
  setSearchResultType: Dispatch<SetStateAction<'교수님' | '학부/학과'>>;
  setSearchResults: Dispatch<SetStateAction<SearchResult[]>>;
}

const SearchResultTypeSelector = ({
  typeName,
  searchResultType,
  setSearchResultType,
  setSearchResults,
}: SearchResultTypeSelectorProps) => {
  const isSelected = typeName === searchResultType;

  const handleTypePress = () => {
    setSearchResults([]);
    setSearchResultType(typeName);
  };

  return (
    <View style={styles.searchResultTypeContainer}>
      <GSRadioButton isSelected={isSelected} onPress={handleTypePress} />
      <Spacer type="width" value={5} />
      <GSText style={styles.searchResultTypeText}>{typeName}</GSText>
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
    color: COLORS.BLUE_LIGHT_100,
    fontSize: 16,
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
