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

export default function FeedTab() {
  const [feedsList, setFeedsList] = useState([]);

  // TODO - fetch하는 조건 설정 필요
  useEffect(() => {
    const fetchFeeds = async () => {
      const posts = await getAllFeeds();
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
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListFooterComponent={() => <View style={{ height: 150 }} />}
      />
    </View>
  );
}
