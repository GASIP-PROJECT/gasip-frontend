import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getPopularFeeds } from '@api/index';
import { useNewFeedContext } from '@contexts/NewFeedContext';

import FeedSummary from '@screens/HomeScreen/FeedsScreen/FeedSummary';

import { type Feed } from 'types/searchTypes';
import { COLORS } from '@styles/colors';

export default function TopFeedsTab() {
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

    const posts = await getPopularFeeds(0);

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
    <View>
      <FlatList
        data={popularFeedsList}
        renderItem={({ item }: { item: Feed }) => (
          <FeedSummary feedData={item} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.WHITE]}
            tintColor={COLORS.WHITE}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onListEndReached}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListFooterComponent={() => <View style={{ height: 150 }} />}
      />
    </View>
  );
}
