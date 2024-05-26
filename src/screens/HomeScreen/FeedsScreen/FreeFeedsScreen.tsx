import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { getAllFeeds } from '@api/index';
import useNewFeedStore from '@store/newFeedStore';

import FeedSummary from './FeedSummary';
import FeedsListContainer from '@screens/HomeScreen/FeedsListContainer/FeedsListContainer';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { type Feed } from 'types/searchTypes';
import icon_papers from '@assets/icon_papers.png';

export default function FreeFeedsScreen() {
  const page = useRef(0);
  const flatListRef = useRef(null);
  const toggleToUpdateFeedsList = useNewFeedStore(
    state => state.toggleToUpdateFeedsList,
  );

  const [feedsList, setFeedsList] = useState<Feed[] | []>([]);
  const [refreshing, setRefreshing] = useState(false);

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0 });
    }
  };

  const onListEndReached = async () => {
    page.current += 1;

    const posts: Feed[] = await getAllFeeds(page.current);

    if (posts.length > 0) {
      setFeedsList([...feedsList, ...posts]);
    }
  };

  const resetFetchPage = () => {
    page.current = 0;
  };

  const fetchFeedsAndSetFeedList = async () => {
    const posts: Feed[] = await getAllFeeds(0, 10);
    setFeedsList([...posts]);
  };

  useEffect(() => {
    fetchFeedsAndSetFeedList();
    resetFetchPage();
    scrollToTop();
  }, [toggleToUpdateFeedsList]);

  const onRefresh = async () => {
    setRefreshing(true);
    fetchFeedsAndSetFeedList();
    resetFetchPage();
    scrollToTop();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // console.log('length: ', feedsList.length);
  // feedsList.forEach(feed => console.log(feed.postId));
  // console.log('-----------');

  return (
    <FeedsListContainer title="전체 리뷰" titleIcon={icon_papers}>
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
            colors={[COLORS.BLUE_LIGHT_200]}
            tintColor={COLORS.BLUE_LIGHT_200}
          />
        }
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <Spacer type="height" value={15} />}
        ListFooterComponent={() => <Spacer type="height" value={150} />}
      />
    </FeedsListContainer>
  );
}
