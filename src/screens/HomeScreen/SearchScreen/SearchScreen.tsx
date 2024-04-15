import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { type SearchResult } from 'types/searchTypes';

interface SearchScreenProps {
  isSearchPageOpen: boolean;
  setIsSearchPageOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchScreen({
  isSearchPageOpen,
  setIsSearchPageOpen,
}: SearchScreenProps) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [noSearchResult, setNoSearchResult] = useState<boolean>(false);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        setIsSearchPageOpen={setIsSearchPageOpen}
        setSearchResults={setSearchResults}
        setNoSearchResult={setNoSearchResult}
      />
      <Spacer type="height" value={20} />

      {searchResults.length > 0 && (
        <SearchResults searchResults={searchResults} />
      )}

      {noSearchResult && <NoSearchResult />}
    </View>
  );
}

const NoSearchResult = () => {
  return (
    <View style={styles.noSearchResultContainer}>
      <Text style={styles.noSearchResultText}>검색 결과가 없습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noSearchResultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100%',
    // backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  noSearchResultText: {
    fontSize: 16,
    color: COLORS.WHITE,
  },
});