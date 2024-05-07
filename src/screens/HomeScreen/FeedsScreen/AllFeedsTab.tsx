import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getAllFeeds } from '@api/index';
import { useNewFeedContext } from '@contexts/NewFeedContext';

import FeedSummary from './FeedSummary';

import Spacer from '@components/common/Spacer';

import { type Feed } from 'types/searchTypes';
import { COLORS } from '@styles/colors';

export default function AllFeedsTab() {
  const { toggleToUpdateFeedsList } = useNewFeedContext();
  const flatListRef = useRef(null);

  const [page, setPage] = useState(0);
  const [feedsList, setFeedsList] = useState<Feed[] | []>([]);
  const [refreshing, setRefreshing] = useState(false);

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0 });
    }
  };

  const onListEndReached = async () => {
    setPage(prev => prev + 1);

    const posts: Feed[] = await getAllFeeds(page);

    if (posts.length > 0) {
      setFeedsList([...feedsList, ...posts]);
    }
  };

  const resetFetchPage = () => {
    setPage(0);
  };

  const fetchFeedsAndSetFeedList = async () => {
    const posts: Feed[] = await getAllFeeds(0);
    setFeedsList([...posts]);
  };

  useEffect(() => {
    fetchFeedsAndSetFeedList();
    resetFetchPage();
    scrollToTop();
  }, [toggleToUpdateFeedsList]);

  useFocusEffect(
    React.useCallback(() => {
      fetchFeedsAndSetFeedList();
      resetFetchPage();
      scrollToTop();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    fetchFeedsAndSetFeedList();
    resetFetchPage();
    scrollToTop();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Refresh indicator will be visible for at least 1 second
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={feedsList}
        extraData={toggleToUpdateFeedsList}
        renderItem={({ item }: { item: Feed }) => (
          <FeedSummary feedData={item} />
        )}
        onEndReached={onListEndReached}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.WHITE]}
            tintColor={COLORS.WHITE}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <Spacer type="height" value={15} />}
        ListFooterComponent={() => <Spacer type="height" value={150} />}
      />
    </View>
  );
}
