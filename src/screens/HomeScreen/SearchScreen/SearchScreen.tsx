import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SearchScreenHeader from './SearchScreenHeader';

import Spacer from '@components/common/Spacer';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';
import { type SearchResult } from 'types/searchTypes';

interface SearchScreenProps {
  isSearchPageOpen: boolean;
  setIsSearchPageOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchScreen() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [noSearchResult, setNoSearchResult] = useState<boolean>(false);
  const [searchResultType, setSearchResultType] = useState<
    '교수님' | 'Content'
  >('교수님');

  return (
    <SafeAreaLayout noBottomPadding style={{ paddingHorizontal: 16 }}>
      <Spacer type="height" value={10} />
      <SearchScreenHeader />
      <Spacer type="height" value={24} />
      <SearchBar
        setSearchResults={setSearchResults}
        setNoSearchResult={setNoSearchResult}
        searchResultType={searchResultType}
        setSearchResultType={setSearchResultType}
      />
      {/* <Spacer type="height" value={20} />

      {searchResults.length > 0 && (
        <SearchResults
          searchResults={searchResults}
          searchResultType={searchResultType}
        />
      )}
 
      {noSearchResult && <NoSearchResult />} */}
    </SafeAreaLayout>
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
