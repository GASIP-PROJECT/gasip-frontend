import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { getPopularFeeds } from '@api/index';
import { NewFeedContext } from '@contexts/NewFeedContext';

import FeedSummary from '@screens/HomeScreen/FeedsScreen/FeedSummary';

// TODO - 타입 통일
interface Feed {
  content: string;
  likeCount: number;
  clickCount: number;
  regDate: string;
  postId: number;
}

export default function TopFeedsTab() {
  const { toggleToUpdateFeedsList } = useContext(NewFeedContext);
  const flatListRef = useRef(null);

  const [page, setPage] = useState(0);
  const [popularFeedsList, setPopularFeedsList] = useState([]);

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

  // TODO - fetch하는 조건 설정 필요
  useEffect(() => {
    setPage(0);

    const fetchPopularFeeds = async () => {
      const posts = await getPopularFeeds(0);

      setPopularFeedsList(posts);
    };

    fetchPopularFeeds();
    scrollToTop();
  }, [toggleToUpdateFeedsList]);

  return (
    <View>
      <FlatList
        data={popularFeedsList}
        renderItem={({ item }: { item: Feed }) => (
          <FeedSummary
            content={item.content}
            likeCount={item.likeCount}
            clickCount={item.clickCount}
            regDate={item.regDate}
            postId={item.postId}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onListEndReached}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListFooterComponent={() => <View style={{ height: 150 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
