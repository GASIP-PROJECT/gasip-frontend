import React, { Dispatch, SetStateAction, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

import SearchBar from './SearchBar';

interface SearchScreenProps {
  isSearchPageOpen: boolean;
  setIsSearchPageOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchScreen({
  isSearchPageOpen,
  setIsSearchPageOpen,
}: SearchScreenProps) {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [hasSearchedAtlasOnce, setHasSearchedAtlasOnce] =
    useState<boolean>(false);

  return (
    <View>
      <SearchBar setIsSearchPageOpen={setIsSearchPageOpen} />

      {searchResults.length > 0 && (
        <FlatList data={searchResults} renderItem={({ item }) => <View />} />
      )}

      {hasSearchedAtlasOnce && searchResults.length === 0 && (
        <Text>검색 결과가 없습니다.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
