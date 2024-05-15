import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';

import { getProfessorFeeds } from '@api/index';
import useNewFeedStore from '@store/newFeedStore';

import FeedSummary from '@screens/HomeScreen/FeedsScreen/FeedSummary';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { type Feed } from 'types/searchTypes';

import icon_write from '@assets/icon_write.png';

export default function ProfessorFeeds({ profId }: { profId: number }) {
  const toggleToUpdateFeedsList = useNewFeedStore(
    state => state.toggleToUpdateFeedsList,
  );

  const [feeds, setFeeds] = useState<Feed[] | []>([]);
  const [page, setPage] = useState(0);

  const onListEndReached = async () => {
    setPage(prev => prev + 1);
    const posts: Feed[] = await getProfessorFeeds(profId, page);

    if (posts.length > 0) {
      setFeeds([...feeds, ...posts]);
    }
  };

  const fetchFeeds = async () => {
    setPage(0);
    const posts: Feed[] = await getProfessorFeeds(profId, 0);
    setFeeds([...posts]);
  };

  useEffect(() => {
    fetchFeeds();
  }, [toggleToUpdateFeedsList]);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={feeds}
        extraData={toggleToUpdateFeedsList}
        renderItem={({ item }: { item: Feed }) => (
          <FeedSummary feedData={item} />
        )}
        onEndReached={onListEndReached}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <Spacer type="height" value={6} />}
        ListFooterComponent={() => <Spacer type="height" value={150} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const Header = () => {
  return (
    <>
      <Spacer type="height" value={20} />
      <View style={styles.headerContainer}>
        <Image source={icon_write} style={{ width: 22, height: 20 }} />
        <Spacer type="width" value={6} />
        <GSText style={styles.headerTitleText}>솔직한 리뷰 둘러보기</GSText>
      </View>
      <GSText style={styles.feedCountText}>게시글(12개)</GSText>
      <Spacer type="height" value={10} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: COLORS.GRAY_50,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  feedCountText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.GRAY_500,
    alignSelf: 'flex-end',
  },
});
