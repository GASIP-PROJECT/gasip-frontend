import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { getPopularFeeds } from '@api/index';
import useNewFeedStore from '@store/newFeedStore';

import FeedSummary from '@screens/HomeScreen/FeedsScreen/FeedSummary';
import FeedsListContainer from '@screens/HomeScreen/FeedsListContainer/FeedsListContainer';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { type Feed } from 'types/searchTypes';
import icon_fire from '@assets/icon_fire.png';

export default function PopularReviewsScreen() {
  const page = useRef(0);
  const flatListRef = useRef(null);
  const toggleToUpdateFeedsList = useNewFeedStore(
    state => state.toggleToUpdateFeedsList,
  );

  const [popularFeedsList, setPopularFeedsList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0 });
    }
  };

  const onListEndReached = async () => {
    page.current += 1;

    const posts: [] = await getPopularFeeds(page.current, 10);

    if (posts.length > 0) {
      setPopularFeedsList([...popularFeedsList, ...posts]);
    }
  };

  const resetFetchPage = () => {
    page.current = 0;
  };

  const fetchFeeds = async () => {
    resetFetchPage();
    const posts: [] = await getPopularFeeds(0, 10);
    setPopularFeedsList([...posts]);
    scrollToTop();
  };

  useEffect(() => {
    fetchFeeds();
  }, [toggleToUpdateFeedsList]);

  const onRefresh = async () => {
    setRefreshing(true);
    fetchFeeds();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <FeedsListContainer
      title="인기글"
      titleIcon={icon_fire}
      showButton={false}
      subText="인기가 많은 리뷰를 볼 수 있는 게시판이에요."
    >
      <FlatList
        ref={flatListRef}
        data={popularFeedsList}
        extraData={toggleToUpdateFeedsList}
        renderItem={({ item }: { item: Feed }) => (
          <FeedSummary feedData={item} />
        )}
        onEndReached={onListEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.BLUE_LIGHT_200]}
            tintColor={COLORS.BLUE_LIGHT_200}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <Spacer type="height" value={8} />}
        ListFooterComponent={() => <Spacer type="height" value={150} />}
      />
    </FeedsListContainer>
  );
}
