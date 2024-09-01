import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import { FlashList } from '@shopify/flash-list';

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

  const [blockedUserList, _] = useMMKVString('blockedUserList');

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0 });
    }
  };

  const onListEndReached = async () => {
    // TODO - 요소가 하나일 때 call되는게 이슈인데, 일단 해결 방법을 찾지 못해서 당장 page가0이고 길이가 10보다 작을 때, 즉 다음 페이지를 불러올 만큼의 데이터가 없을 때 이상하게 처리되지 않도록 하였음.
    // 비슷한 형태의 게시글 화면들은 다 수정되어야 한다.
    if (page.current === 0 && popularFeedsList.length < 10) return;
    page.current += 1;

    const posts: [] = await getPopularFeeds(page.current, 10);

    // TODO - 차단된 유저글을 거르고 표시한다. 차후 백엔드에서 걸러서 내려줄 부분이라 프론트에서는 필터링 로직 제거되어야 한다.
    const blockedUserIdArray = blockedUserList
      ? JSON.parse(blockedUserList)
      : [];

    const filteredByBlockedUsers = posts.filter(
      (post: Feed) => !blockedUserIdArray.includes(post.memberNickname),
    );

    if (posts.length > 0) {
      setPopularFeedsList([...popularFeedsList, ...filteredByBlockedUsers]);
    }
  };

  const resetFetchPage = () => {
    page.current = 0;
  };

  const fetchFeeds = async () => {
    resetFetchPage();
    const posts: [] = await getPopularFeeds(0, 10);

    // TODO - 차단된 유저글을 거르고 표시한다. 차후 백엔드에서 걸러서 내려줄 부분이라 프론트에서는 필터링 로직 제거되어야 한다.
    const blockedUserIdArray = blockedUserList
      ? JSON.parse(blockedUserList)
      : [];

    const filteredByBlockedUsers = posts.filter(
      (post: Feed) => !blockedUserIdArray.includes(post.memberNickname),
    );

    setPopularFeedsList([...filteredByBlockedUsers]);
    scrollToTop();
  };

  useEffect(() => {
    fetchFeeds();
  }, [toggleToUpdateFeedsList]);

  useEffect(() => {
    const blockedUserIdArray = blockedUserList
      ? JSON.parse(blockedUserList)
      : [];

    const filteredByBlockedUsers = popularFeedsList.filter(
      (post: Feed) => !blockedUserIdArray.includes(post.memberNickname),
    );

    setPopularFeedsList([...filteredByBlockedUsers]);
  }, [blockedUserList]);

  const onRefresh = async () => {
    setRefreshing(true);
    fetchFeeds();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <FeedsListContainer
      title="실시간 인기글"
      titleIcon={icon_fire}
      showButton={false}
      subText="인기가 많은 리뷰를 볼 수 있는 게시판이에요."
    >
      <FlashList
        ref={flatListRef}
        data={popularFeedsList}
        extraData={toggleToUpdateFeedsList}
        renderItem={({ item, index }: { item: Feed; index: number }) => {
          return (
            // 교수님에 대한 글이 아닌 경우 인기글에서 교수님 이름 태그가 보이지 않도록 처리
            <FeedSummary
              feedData={item}
              isLastElement={index === popularFeedsList.length - 1}
              showProfNameTag={item?.profName !== '전체'}
            />
          );
        }}
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
        estimatedItemSize={72}
      />
    </FeedsListContainer>
  );
}
