import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';

import { getAllProfessorReviews } from '@api/index';
import useNewFeedStore from '@store/newFeedStore';

import FeedSummary from './FeedSummary';
import FeedsListContainer from '@screens/HomeScreen/FeedsListContainer/FeedsListContainer';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { type Feed } from 'types/searchTypes';
import icon_papers from '@assets/icon_papers.png';

export default function AllReviewsScreen() {
  const page = useRef(0);
  const flatListRef = useRef(null);
  const toggleToUpdateFeedsList = useNewFeedStore(
    state => state.toggleToUpdateFeedsList,
  );

  const [feedsList, setFeedsList] = useState<Feed[] | []>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [blockedUserList, _] = useMMKVString('blockedUserList');

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0 });
    }
  };

  const onListEndReached = async () => {
    if (page.current === 0 && feedsList.length < 10) return;
    page.current += 1;

    const posts: Feed[] = await getAllProfessorReviews(page.current, 10);

    const blockedUserIdArray = blockedUserList
      ? JSON.parse(blockedUserList)
      : [];

    const filteredByBlockedUsers = posts.filter(
      (post: Feed) => !blockedUserIdArray.includes(post.memberNickname),
    );

    if (posts.length > 0) {
      setFeedsList([...feedsList, ...filteredByBlockedUsers]);
    }
  };

  const resetFetchPage = () => {
    page.current = 0;
  };

  const fetchFeedsAndSetFeedList = async () => {
    const posts: Feed[] = await getAllProfessorReviews(0, 10);
    const blockedUserIdArray = blockedUserList
      ? JSON.parse(blockedUserList)
      : [];

    const filteredByBlockedUsers = posts.filter(
      (post: Feed) => !blockedUserIdArray.includes(post.memberNickname),
    );
    setFeedsList([...filteredByBlockedUsers]);
  };

  // TODO - 행동 이상한 부분 수정 필요
  // resetFetchPage가 최초 렌더링 시 실행되는 것이 이슈가 아닌지 확인 필요
  useEffect(() => {
    fetchFeedsAndSetFeedList();
    scrollToTop();
  }, [toggleToUpdateFeedsList]);

  useEffect(() => {
    const blockedUserIdArray = blockedUserList
      ? JSON.parse(blockedUserList)
      : [];

    const filteredByBlockedUsers = feedsList.filter(
      (post: Feed) => !blockedUserIdArray.includes(post.memberNickname),
    );

    setFeedsList([...filteredByBlockedUsers]);
  }, [blockedUserList]);

  const onRefresh = async () => {
    setRefreshing(true);
    fetchFeedsAndSetFeedList();
    resetFetchPage();
    scrollToTop();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <FeedsListContainer
      title="전체 리뷰"
      titleIcon={icon_papers}
      subText="모든 리뷰가 모여있는 게시판이에요."
    >
      <FlatList
        ref={flatListRef}
        data={feedsList}
        extraData={toggleToUpdateFeedsList}
        renderItem={({ item, index }: { item: Feed; index: number }) => {
          return (
            <FeedSummary
              feedData={item}
              isLastElement={index === feedsList.length - 1}
            />
          );
        }}
        ListEmptyComponent={() => <View />}
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
        ItemSeparatorComponent={() => <Spacer type="height" value={8} />}
      />
    </FeedsListContainer>
  );
}
