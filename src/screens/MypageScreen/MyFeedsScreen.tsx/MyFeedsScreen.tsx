import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { getAllMyFeeds } from '@api/index';

import FeedSummary from '@screens/HomeScreen/FeedsScreen/FeedSummary';
import FeedsListContainer from '@screens/HomeScreen/FeedsListContainer/FeedsListContainer';

import Spacer from '@components/common/Spacer';

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
    <FeedsListContainer title="내가 쓴 글" showButton={false}>
      <FlatList
        data={myFeeds}
        renderItem={({ item }) => <FeedSummary feedData={item} />}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <Spacer type="height" value={15} />}
        ListFooterComponent={() => <Spacer type="height" value={150} />}
      />
    </FeedsListContainer>
  );
}
