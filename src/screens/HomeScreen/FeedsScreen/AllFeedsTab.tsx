import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { getAllFeeds } from '@api/index';
import { NewFeedContext } from '@contexts/NewFeedContext';

import FeedSummary from './FeedSummary';

import Spacer from '@components/common/Spacer';

// TODO - 타입 통일
interface Feed {
  content: string;
  likeCount: number;
  clickCount: number;
  regDate: string;
  postId: number;
}

export default function AllFeedsTab() {
  const { toggleToUpdateFeedsList } = useContext(NewFeedContext);

  const [page, setPage] = useState(0);
  const [feedsList, setFeedsList] = useState<[Feed] | []>([]);

  const onListEndReached = async () => {
    setPage(prev => prev + 1);

    const posts: [] = await getAllFeeds(page);

    if (posts.length > 0) {
      setFeedsList([...feedsList, ...posts]);
    }
  };

  useEffect(() => {
    // TODO -  page 변수 초기화가 여기서 이루어지는 게 최선인지 고민 필요
    setPage(0);

    const fetchFeeds = async () => {
      const posts: [Feed] = await getAllFeeds(0);
      setFeedsList([...posts]);
    };

    fetchFeeds();
  }, [toggleToUpdateFeedsList]);

  return (
    <View>
      <FlatList
        data={feedsList}
        extraData={toggleToUpdateFeedsList}
        renderItem={({ item }: { item: Feed }) => (
          <FeedSummary
            content={item.content}
            likeCount={item.likeCount}
            clickCount={item.clickCount}
            regDate={item.regDate}
            postId={item.postId}
          />
        )}
        onEndReached={onListEndReached}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <Spacer type="height" value={15} />}
        ListFooterComponent={() => <Spacer type="height" value={150} />}
      />
    </View>
  );
}
