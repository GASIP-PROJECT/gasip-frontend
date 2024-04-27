import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import { searchFeeds, searchProfessors } from '@api/index';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';
import GSRadioButton from '@components/common/GSRadioButton';

import { COLORS } from '@styles/colors';
import { type SearchResult } from 'types/searchTypes';

export default function SearchBar({
  setIsSearchPageOpen,
  setSearchResults,
  setNoSearchResult,
  searchResultType,
  setSearchResultType,
}: {
  setIsSearchPageOpen: Dispatch<SetStateAction<boolean>>;
  setSearchResults: Dispatch<SetStateAction<SearchResult[]>>;
  setNoSearchResult: Dispatch<SetStateAction<boolean>>;
  searchResultType: 'Professor' | 'Content';
  setSearchResultType: Dispatch<SetStateAction<'Professor' | 'Content'>>;
}) {
  const [searchText, setSearchText] = useState<string>('');

  const handleCancelPress = () => {
    setIsSearchPageOpen(false);
  };

  const handleSearchSubmit = async () => {
    if (searchResultType === 'Professor') {
      const professors = await searchProfessors(searchText);
      // console.log(professors);
      if (professors.length === 0) {
        setNoSearchResult(true);
      } else {
        setNoSearchResult(false);
      }
      setSearchResults([...professors]);
    }

    if (searchResultType === 'Content') {
      const feeds = await searchFeeds(searchText);
      // console.log(feeds);
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
      <View style={styles.container}>
        <TextInput
          style={styles.searchTextInput}
          placeholder="검색"
          placeholderTextColor={'#999999'}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={handleSearchSubmit}
          onFocus={handleTextInputFocus}
        />

        <View style={styles.searchIconContainer}>
          <GSIcon name="search-outline" size={20} color="#999999" />
        </View>

        <Spacer type="width" value={8} />

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelPress}
        >
          <Text style={styles.cancelButtonText}>취소</Text>
        </TouchableOpacity>
      </View>
      <Spacer type="height" value={10} />

      <View style={{ flexDirection: 'row' }}>
        <SearchResultTypeSelector
          typeName="Professor"
          searchResultType={searchResultType}
          setSearchResultType={setSearchResultType}
          setSearchResults={setSearchResults}
        />
        <Spacer type="width" value={10} />
        <SearchResultTypeSelector
          typeName="Content"
          searchResultType={searchResultType}
          setSearchResultType={setSearchResultType}
          setSearchResults={setSearchResults}
        />
      </View>
    </>
  );
}

interface SearchResultTypeSelectorProps {
  typeName: 'Professor' | 'Content';
  searchResultType: 'Professor' | 'Content';
  setSearchResultType: Dispatch<SetStateAction<'Professor' | 'Content'>>;
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
      <Text style={styles.searchResultTypeText}>{typeName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  searchTextInput: {
    flex: 1,
    fontSize: 16,
    height: 40,
    paddingLeft: 35,
    paddingRight: 15,
    borderRadius: 20,
    backgroundColor: '#545151',
    color: COLORS.WHITE,
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
    left: 10,
    top: 10,
  },
  searchResultTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchResultTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
});
