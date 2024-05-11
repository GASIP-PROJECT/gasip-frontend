import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getPopularFeeds } from '@api/index';
import { useNewFeedContext } from '@contexts/NewFeedContext';

import FeedSummary from '@screens/HomeScreen/FeedsScreen/FeedSummary';
import FeedsListContainer from '@screens/HomeScreen/FeedsListContainer/FeedsListContainer';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { type Feed } from 'types/searchTypes';
import icon_fire from '@assets/icon_fire.png';

export default function PopularReviewsScreen() {
  const { toggleToUpdateFeedsList } = useNewFeedContext();
  const flatListRef = useRef(null);

  const [page, setPage] = useState(0);
  const [popularFeedsList, setPopularFeedsList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0 });
    }
  };

  const onListEndReached = async () => {
    setPage(prev => prev + 1);

    const posts: [] = await getPopularFeeds(page);

    if (posts.length > 0) {
      setPopularFeedsList([...popularFeedsList, ...posts]);
    }
  };

  const fetchFeeds = async () => {
    setPage(0);

    const posts = await getPopularFeeds(0, 10);

    setPopularFeedsList(posts);

    scrollToTop();
  };

  // TODO - fetch하는 조건 설정 필요
  useEffect(() => {
    fetchFeeds();
  }, [toggleToUpdateFeedsList]);

  useFocusEffect(
    React.useCallback(() => {
      fetchFeeds();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    fetchFeeds();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Refresh indicator will be visible for at least 1 second
  };

  return (
    <FeedsListContainer title="인기글" titleIcon={icon_fire}>
      <FlatList
        ref={flatListRef}
        data={popularFeedsList}
        extraData={toggleToUpdateFeedsList}
        renderItem={({ item }: { item: Feed }) => (
          <FeedSummary feedData={item} />
        )}
        onEndReached={onListEndReached}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.BLUE_LIGHT_200]}
            tintColor={COLORS.BLUE_LIGHT_200}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <Spacer type="height" value={15} />}
        ListFooterComponent={() => <Spacer type="height" value={150} />}
      />
    </FeedsListContainer>
  );
}
