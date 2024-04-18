import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { getAllMyFeeds } from '@api/index';

import MyFeedsScreenHeader from './MyFeedsScreenHeader';
import FeedSummary from '@screens/HomeScreen/FeedsScreen/FeedSummary';

import Spacer from '@components/common/Spacer';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { Feed } from 'types/searchTypes';

// TODO - 페이지네이션?
export default function MyFeedsScreen() {
  const [myFeeds, setMyFeeds] = useState<Feed[] | []>([]);

  useEffect(() => {
    const fetchMyFeeds = async () => {
      const fetchedMyFeeds = await getAllMyFeeds();

      setMyFeeds([...fetchedMyFeeds]);
    };

    fetchMyFeeds();
  }, []);

  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <MyFeedsScreenHeader />
        <Spacer type="height" value={20} />

        <FlatList
          data={myFeeds}
          renderItem={({ item }) => (
            <FeedSummary
              content={item.content}
              likeCount={item.likeCount}
              clickCount={item.clickCount}
              regDate={item.regDate}
              postId={item.postId}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <Spacer type="height" value={15} />}
          ListFooterComponent={() => <Spacer type="height" value={150} />}
        />
      </View>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
