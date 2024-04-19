import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { getProfessorFeeds } from '@api/index';
import { NewFeedContext } from '@contexts/NewFeedContext';

import FeedSummary from '@screens/HomeScreen/FeedsScreen/FeedSummary';

import Spacer from '@components/common/Spacer';

import { type Feed } from 'types/searchTypes';

export default function ProfessorFeeds({ profId }: { profId: number }) {
  const { toggleToUpdateFeedsList } = useContext(NewFeedContext);

  const [feeds, setFeeds] = useState<Feed[] | []>([]);
  const [page, setPage] = useState(0);

  const onListEndReached = async () => {
    setPage(prev => prev + 1);
    const posts: Feed[] = await getProfessorFeeds(profId, page);

    if (posts.length > 0) {
      setFeeds([...feeds, ...posts]);
    }
  };

  useEffect(() => {
    setPage(0);
    const fetchFeeds = async () => {
      const posts: Feed[] = await getProfessorFeeds(profId, 0);
      setFeeds([...posts]);
    };

    fetchFeeds();
  }, []);

  return (
    <View>
      <FlatList
        data={feeds}
        extraData={toggleToUpdateFeedsList}
        renderItem={({ item }: { item: Feed }) => (
          <FeedSummary feedData={item} />
        )}
        onEndReached={onListEndReached}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <Spacer type="height" value={15} />}
        ListFooterComponent={() => <Spacer type="height" value={150} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
