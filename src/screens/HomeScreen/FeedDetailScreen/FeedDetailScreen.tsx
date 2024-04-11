import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { getCommentsForFeed, getFeedData } from '@api/index';

import FeedContent from './FeedContent';
import FeedComment from './FeedComment';
import ProfessorInfo from './ProfessorInfo';
import FeedDetailScreenHeader from './FeedDetailScreenHeader';

import Spacer from '@components/common/Spacer';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

// TODO - type 선언 필요
export default function FeedDetailScreen({ route, navigation }) {
  const { postId } = route.params;

  const [feedData, setFeedData] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchFeedData = async () => {
      const feedData = await getFeedData(postId);
      const comments = await getCommentsForFeed(postId);

      // console.log(feedData);

      setFeedData(feedData);
      setComments(comments);
    };

    fetchFeedData();
  }, []);

  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <FeedDetailScreenHeader />
        <Spacer type="height" value={10} />
        {feedData !== null ? (
          <>
            <ProfessorInfo profName="홍길동" majorName="컴퓨터공학과" />
            <Spacer type="height" value={10} />
            <FeedContent feedData={feedData} />
            <Spacer type="height" value={10} />

            {comments.length > 0 && (
              <View
                style={{
                  backgroundColor: '#28292A',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                {comments.map((comment, index) => (
                  <FeedComment key={index.toString()} commentData={comment} />
                ))}
              </View>
            )}
          </>
        ) : (
          <Text>로딩중...</Text>
        )}
      </View>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
