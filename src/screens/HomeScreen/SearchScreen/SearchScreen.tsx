import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SearchScreenHeader from './SearchScreenHeader';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';
import { type SearchResult } from 'types/searchTypes';

import icon_x_face from '@assets/icon_x_face.png';

interface SearchScreenProps {
  isSearchPageOpen: boolean;
  setIsSearchPageOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchScreen() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [noSearchResult, setNoSearchResult] = useState<boolean>(true);
  const [searchResultType, setSearchResultType] = useState<
    '교수님' | 'Content'
  >('교수님');

  return (
    <SafeAreaLayout noBottomPadding>
      <View style={{ paddingHorizontal: 16 }}>
        <Spacer type="height" value={10} />
        <SearchScreenHeader />
        <Spacer type="height" value={24} />
        <SearchBar
          setSearchResults={setSearchResults}
          setNoSearchResult={setNoSearchResult}
          searchResultType={searchResultType}
          setSearchResultType={setSearchResultType}
        />
      </View>

      <Spacer type="height" value={30} />

      {searchResults.length > 0 && (
        <SearchResults
          searchResults={searchResults}
          searchResultType={searchResultType}
        />
      )}

      {noSearchResult && <NoSearchResult />}
    </SafeAreaLayout>
  );
}

const NoSearchResult = () => {
  return (
    <View style={styles.noSearchResultContainer}>
      <Image source={icon_x_face} style={{ width: 80, height: 80 }} />
      <Spacer type="height" value={16} />
      <GSText style={styles.noSearchResultText}>검색 결과가 없어요</GSText>
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
    color: COLORS.GRAY_400,
  },
});
