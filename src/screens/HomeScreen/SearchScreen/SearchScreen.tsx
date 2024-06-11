import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { useSearchContext } from '@contexts/SearchContext';

import SearchBar from '@screens/HomeScreen/SearchScreen/SearchBar';
import SearchResults from '@screens/HomeScreen/SearchScreen/SearchResults';
import FeedSearchResults from '@screens/HomeScreen/SearchScreen/FeedSearchResults';
import SearchScreenHeader from '@screens/HomeScreen/SearchScreen/SearchScreenHeader';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';
import { SEARCH_CATEGORY } from '../../../constants';

import icon_x_face from '@assets/icon_x_face.png';

// TODO - 검색결과 화면처리 필요
export default function SearchScreen() {
  const { searchResults, noSearchResult, searchCategory } = useSearchContext();

  return (
    <SafeAreaLayout noBottomPadding>
      <View style={{ paddingHorizontal: 24, zIndex: 1 }}>
        <Spacer type="height" value={10} />
        <SearchScreenHeader />
        <Spacer type="height" value={24} />
        <SearchBar />
      </View>

      <Spacer type="height" value={30} />

      {searchResults.length > 0 && searchCategory !== SEARCH_CATEGORY.FEED ? (
        <SearchResults />
      ) : (
        <FeedSearchResults />
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
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  noSearchResultText: {
    fontSize: 16,
    color: COLORS.GRAY_400,
  },
});
