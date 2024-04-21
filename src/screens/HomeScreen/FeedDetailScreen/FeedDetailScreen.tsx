import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { getFeedData } from '@api/index';

import FeedContent from './FeedContent';
import FeedComment from './FeedComment';
import ProfessorInfo from './ProfessorInfo';
import FeedReplyInput from './FeedReplyInput';

import Spacer from '@components/common/Spacer';
import GSIcon from '@components/common/GSIcon';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { type Feed } from 'types/searchTypes';

// TODO - type 선언 필요
export default function FeedDetailScreen({ route, navigation }) {
  const { postId } = route.params;

  const [feedData, setFeedData] = useState<Feed | null>(null);
  const [updateFeed, setUpdateFeed] = useState<boolean>(false);

  useEffect(() => {
    const fetchFeedData = async () => {
      const feedData = await getFeedData(postId);

      setFeedData(feedData);
    };

    fetchFeedData();
  }, [updateFeed]);

  return (
    <SafeAreaLayout noBottomPadding>
      <GSHeader
        title="게시글 상세"
        leftComponent={<GSIcon name="chevron-back-outline" />}
        onLeftComponentPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <Spacer type="height" value={10} />
        {feedData !== null ? (
          <>
            {feedData.profId !== 0 && (
              <ProfessorInfo
                profName={feedData.profName}
                majorName={feedData.majorName}
              />
            )}
            <Spacer type="height" value={10} />
            <FeedContent feedData={feedData} setUpdateFeed={setUpdateFeed} />
            <Spacer type="height" value={10} />
            {feedData?.comments.length > 0 && (
              <View
                style={{
                  backgroundColor: '#28292A',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{ fontSize: 16, color: '#f5f5f5', fontWeight: '700' }}
                >
                  댓글{' '}
                  <Text style={{ fontWeight: '500' }}>
                    {feedData.commentCount}
                  </Text>
                </Text>
                <Spacer type="height" value={10} />
                {feedData.comments.map((comment, index) => (
                  <FeedComment key={index.toString()} commentData={comment} />
                ))}
              </View>
            )}
          </>
        ) : (
          <Text>로딩중...</Text>
        )}
      </ScrollView>

      <FeedReplyInput postId={postId} setUpdateFeed={setUpdateFeed} />
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
