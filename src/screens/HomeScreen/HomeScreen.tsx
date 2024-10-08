import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useMMKVString } from 'react-native-mmkv';

import {
  getAllProfessorReviewsForHomeScreen,
  getAllGeneralFeedsForHomeScreen,
  getPopularFeedsForHomeScreen,
} from '@api/index';
import useNewFeedStore from '@store/newFeedStore';

import CampusMenus from './HomeScreen/CampusMenus';
import SearchButton from './HomeScreen/SearchButton';
import HomeFeedList from './HomeScreen/HomeFeedList';
import HomeScreenHeader from './HomeScreen/HomeScreenHeader';
import WriteProfessorReview from './HomeScreen/WriteProfessorReview';

import Spacer from '@components/common/Spacer';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import icon_fire from '@assets/icon_fire.png';
import icon_chat from '@assets/icon_chat.png';
import icon_papers from '@assets/icon_papers.png';

import { Feed } from '@types/searchTypes';

export default function HomeScreen({ navigation }) {
  const toggleToUpdateFeedsList = useNewFeedStore(
    state => state.toggleToUpdateFeedsList,
  );

  const [allReviews, setAllReviews] = useState<Feed[] | []>([]);
  const [popularReviews, setPopularReviews] = useState<Feed[] | []>([]);
  const [allFreeFeeds, setAllFreeFeeds] = useState<Feed[] | []>([]);

  const [blockedUserList, _] = useMMKVString('blockedUserList');

  useFocusEffect(
    useCallback(() => {
      const fetchAllReviews = async () => {
        const reviews = await getAllProfessorReviewsForHomeScreen();

        const blockedUserIdArray = blockedUserList
          ? JSON.parse(blockedUserList)
          : [];

        const filteredReviews = reviews.filter(
          (review: Feed) => !blockedUserIdArray.includes(review.memberNickname),
        );

        setAllReviews([...filteredReviews]);
      };
      const fetchPopularReviews = async () => {
        const reviews = await getPopularFeedsForHomeScreen();

        const blockedUserIdArray = blockedUserList
          ? JSON.parse(blockedUserList)
          : [];

        const filteredReviews = reviews.filter(
          (review: Feed) => !blockedUserIdArray.includes(review.memberNickname),
        );
        setPopularReviews([...filteredReviews]);
      };
      const fetchAllFreeFeeds = async () => {
        const freeFeeds = await getAllGeneralFeedsForHomeScreen();
        const blockedUserIdArray = blockedUserList
          ? JSON.parse(blockedUserList)
          : [];

        const filteredFeeds = freeFeeds.filter(
          (review: Feed) => !blockedUserIdArray.includes(review.memberNickname),
        );
        setAllFreeFeeds([...filteredFeeds]);
      };

      fetchAllReviews();
      fetchPopularReviews();
      fetchAllFreeFeeds();
    }, [toggleToUpdateFeedsList]),
  );

  return (
    <SafeAreaLayout noBottomPadding style={{ paddingHorizontal: 16 }}>
      <Spacer type="height" value={10} />
      <HomeScreenHeader />
      <Spacer type="height" value={24} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <SearchButton />
        <Spacer type="height" value={20} />
        <CampusMenus />
        <Spacer type="height" value={18} />
        <WriteProfessorReview />
        <Spacer type="height" value={16} />
        <HomeFeedList
          title="실시간 인기글"
          headerIcon={icon_fire}
          onSeeMorePress={() => navigation.navigate('PopularReviewsScreen')}
          data={popularReviews}
        />
        <Spacer type="height" value={24} />
        <HomeFeedList
          title="전체 리뷰"
          headerIcon={icon_papers}
          onSeeMorePress={() => navigation.navigate('AllReviewsScreen')}
          data={allReviews}
        />
        <Spacer type="height" value={24} />
        <HomeFeedList
          title="자유게시판"
          headerIcon={icon_chat}
          onSeeMorePress={() => navigation.navigate('FreeFeedsScreen')}
          data={allFreeFeeds}
        />
        <Spacer type="height" value={100} />
      </ScrollView>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
