import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { getAllFeeds } from '@api/index';

import FeedSummary from './FeedSummary';

interface Feed {
  content: string;
  likeCount: number;
  clickCount: number;
  regDate: string;
}

export default function AllFeedsTab() {
  const [page, setPage] = useState(0);
  const [feedsList, setFeedsList] = useState<[Feed] | []>([]);

  const onListEndReached = async () => {
    setPage(prev => prev + 1);

    const posts: [] = await getAllFeeds(page);

    if (posts.length > 0) {
      setFeedsList([...feedsList, ...posts]);
    }
  };

  // TODO - fetch하는 조건 설정 필요
  useEffect(() => {
    const fetchFeeds = async () => {
      const posts = await getAllFeeds(page);
      setFeedsList(posts);
    };

    fetchFeeds();
  }, []);

  return (
    <View>
      <FlatList
        data={feedsList}
        renderItem={({ item }: { item: Feed }) => (
          <FeedSummary
            content={item.content}
            likeCount={item.likeCount}
            clickCount={item.clickCount}
            regDate={item.regDate}
          />
        )}
        onEndReached={onListEndReached}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListFooterComponent={() => <View style={{ height: 150 }} />}
      />
    </View>
  );
}
