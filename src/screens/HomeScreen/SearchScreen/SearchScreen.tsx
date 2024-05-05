import React from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';

import { useSearchContext } from '@contexts/SearchContext';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SearchScreenHeader from './SearchScreenHeader';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

import icon_x_face from '@assets/icon_x_face.png';

export default function SearchScreen() {
  const { searchResults, noSearchResult, setNoSearchResult } =
    useSearchContext();

  return (
    <SafeAreaLayout noBottomPadding>
      <Button
        title=";ss"
        onPress={() => {
          setNoSearchResult(true);
          console.log(searchResults, noSearchResult);
        }}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <Spacer type="height" value={10} />
        <SearchScreenHeader />
        <Spacer type="height" value={24} />
        <SearchBar />
      </View>

      <Spacer type="height" value={30} />

      {searchResults.length > 0 && <SearchResults />}

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
