import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';

import { getAllProfssorFeedCount, getProfessorFeeds } from '@api/index';
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
  const [feedCount, setFeedCount] = useState(0);

  // TODO - 로직 섬세하게 수정 필요
  const onListEndReached = async () => {
    const posts: Feed[] = await getProfessorFeeds(profId, page + 1);
    setPage(prev => prev + 1);

    if (posts.length > 0) {
      setFeeds([...feeds, ...posts]);
    }
  };

  const fetchFeeds = async () => {
    setPage(0);
    const posts: Feed[] = await getProfessorFeeds(profId, 0);
    setFeeds([...posts]);
  };

  const getFeedsCount = async () => {
    // 교수님 피드 개수 조회
    const professorFeedCount = await getAllProfssorFeedCount(profId);
    setFeedCount(professorFeedCount);
  };

  useEffect(() => {
    fetchFeeds();
    getFeedsCount();
  }, [toggleToUpdateFeedsList]);

  return (
    <View style={styles.container}>
      <Header feedCount={feedCount} />
      <FlatList
        data={feeds}
        extraData={toggleToUpdateFeedsList}
        renderItem={({ item, index }: { item: Feed; index: number }) => (
          <FeedSummary
            feedData={item}
            showProfNameTag={false}
            isLastElement={index === feeds.length - 1}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={onListEndReached}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <Spacer type="height" value={8} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const Header = ({ feedCount }: { feedCount: number }) => {
  return (
    <>
      <Spacer type="height" value={20} />
      <View style={styles.headerContainer}>
        <Image source={icon_write} style={{ width: 22, height: 20 }} />
        <Spacer type="width" value={6} />
        <GSText style={styles.headerTitleText}>솔직한 리뷰 둘러보기</GSText>
      </View>
      <GSText style={styles.feedCountText}>게시글({feedCount}개)</GSText>
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
