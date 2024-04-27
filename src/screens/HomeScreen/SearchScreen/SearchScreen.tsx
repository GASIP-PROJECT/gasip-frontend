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
  const [searchResultType, setSearchResultType] = useState<
    'Professor' | 'Content'
  >('Professor');

  console.log(searchResults);

  return (
    <>
      <SearchBar
        setIsSearchPageOpen={setIsSearchPageOpen}
        setSearchResults={setSearchResults}
        setNoSearchResult={setNoSearchResult}
        searchResultType={searchResultType}
        setSearchResultType={setSearchResultType}
      />
      <Spacer type="height" value={20} />

      {searchResults.length > 0 && (
        <SearchResults
          searchResults={searchResults}
          searchResultType={searchResultType}
        />
      )}

      {noSearchResult && <NoSearchResult />}
    </>
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
    flex: 1,
  },
  noSearchResultText: {
    fontSize: 16,
    color: COLORS.WHITE,
  },
});
