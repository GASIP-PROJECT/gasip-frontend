import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

import HomeScreenHeader from './HomeScreen/HomeScreenHeader';
import FeedsScreen from './FeedsScreen/FeedsScreen';
import SearchScreen from './SearchScreen/SearchScreen';

import Spacer from '@components/common/Spacer';
import SearchButton from './HomeScreen/SearchButton';
import WriteProfessorReview from './HomeScreen/WriteProfessorReview';
import HomeFeedList from './HomeScreen/HomeFeedList';

import icon_papers from '@assets/icon_papers.png';
import icon_fire from '@assets/icon_fire.png';

export default function HomeScreen() {
  const [isSearchPageOpen, setIsSearchPageOpen] = useState<boolean>(false);

  return (
    <SafeAreaLayout noBottomPadding>
      <Spacer type="height" value={10} />
      <HomeScreenHeader />
      <Spacer type="height" value={24} />
      <ScrollView style={styles.container}>
        <SearchButton />
        <Spacer type="height" value={32} />
        <WriteProfessorReview />
        <Spacer type="height" value={28} />
        <HomeFeedList title="전체 피드" headerIcon={icon_papers} />
        <Spacer type="height" value={24} />
        <HomeFeedList title="인기글" headerIcon={icon_fire} />
        <Spacer type="height" value={100} />
      </ScrollView>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
