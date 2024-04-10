import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { getPopularFeeds } from '@api/index';

import FeedSummary from '@screens/HomeScreen/FeedsScreen/FeedSummary';

interface Feed {
  content: string;
  likeCount: number;
  clickCount: number;
  regDate: string;
}

export default function TopFeedsTab() {
  const [popularFeedsList, setPopularFeedsList] = useState([]);

  // TODO - fetch하는 조건 설정 필요
  useEffect(() => {
    const fetchPopularFeeds = async () => {
      const posts = await getPopularFeeds(0, 5);

      setPopularFeedsList(posts);
    };

    fetchPopularFeeds();
  }, []);

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
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListFooterComponent={() => <View style={{ height: 150 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
