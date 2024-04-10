import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import axios from 'axios';

import FeedSummary from '@screens/HomeScreen/FeedTab/FeedSummary';

interface Feed {
  content: string;
  likeCount: number;
  clickCount: number;
  regDate: string;
}

export default function PopularTab() {
  const [popularFeedsList, setPopularFeedsList] = useState([]);

  useEffect(() => {
    const fetchPopularFeeds = async () => {
      try {
        const posts = await axios.get('https://gasip.site/boards/best/0');

        setPopularFeedsList(posts.data.response);
      } catch (error) {}
    };

    fetchPopularFeeds();
    console.log('first');
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
