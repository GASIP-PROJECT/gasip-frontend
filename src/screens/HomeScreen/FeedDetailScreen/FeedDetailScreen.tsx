import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { getFeedData } from '@api/index';

import FeedContent from './FeedContent';
import FeedComment from './FeedComment';
import ProfessorInfo from './ProfessorInfo';

import Spacer from '@components/common/Spacer';
import GSIcon from '@components/common/GSIcon';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { type Feed } from 'types/searchTypes';

// TODO - type 선언 필요
export default function FeedDetailScreen({ route, navigation }) {
  const { postId } = route.params;

  const [feedData, setFeedData] = useState<Feed | null>(null);

  useEffect(() => {
    const fetchFeedData = async () => {
      const feedData = await getFeedData(postId);

      setFeedData(feedData);
    };

    fetchFeedData();
  }, []);

  return (
    <SafeAreaLayout>
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
            <FeedContent feedData={feedData} />
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
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
