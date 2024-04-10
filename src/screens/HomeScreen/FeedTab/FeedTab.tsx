import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import axios from 'axios';

import FeedSummary from './FeedSummary';

interface Feed {
  content: string;
  likeCount: number;
  clickCount: number;
  regDate: string;
}

export default function FeedTab() {
  const [feedsList, setFeedsList] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const posts = await axios.get('https://gasip.site/boards/0');

        setFeedsList(posts.data.response);
      } catch (error) {}
    };

    fetchFeeds();
  }, []);

  return (
    <View style={{ marginBottom: 30 }}>
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
        ListFooterComponent={() => <View style={{ height: 100 }} />}
      />
    </View>
  );
}
