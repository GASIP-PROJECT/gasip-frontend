import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { likeFeed, likeFeedCancel } from '@api/index';
import { getTimeDifference } from '@utils/timeUtil';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { Feed } from 'types/searchTypes';

import icon_like from '@assets/icon_like.png';
import icon_comments from '@assets/icon_comments.png';

export default function FeedContent({ feedData }: { feedData: Feed | null }) {
  if (feedData === null) return <View />;

  const { content, regDate, likeCount, postId, comments } = feedData;

  return (
    <View style={styles.container}>
      <FeedContentHeader regDate={regDate} userNickName="nickName" />
      <Spacer type="height" value={10} />
      <FeedContentText content={content} />
      <Spacer type="height" value={10} />
      <FeedContentFooter
        likeCount={likeCount}
        postId={postId}
        commentCount={comments.length}
      />
    </View>
  );
}
const FeedContentHeader = ({
  regDate,
  userNickName,
}: {
  regDate: string;
  userNickName: string;
}) => {
  const timeString = getTimeDifference(regDate);

  return (
    <Text style={styles.feedHeaderText}>
      {timeString} | {userNickName}
    </Text>
  );
};

const FeedContentText = ({ content }: { content: string }) => {
  return <Text style={styles.feedContentText}>{content}</Text>;
};

const FeedContentFooter = ({
  likeCount,
  postId,
  commentCount,
}: {
  likeCount: number;
  postId: number;
  commentCount: number;
}) => {
  const handleLikePress = async () => {
    // await likeFeed(postId, 7);
    // await likeFeedCancel(postId, 7);
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={handleLikePress}
      >
        <Image source={icon_like} style={{ width: 15, height: 15 }} />
        <Spacer type="width" value={5} />
        <Text style={{ fontSize: 15, color: 'red', fontWeight: '500' }}>
          {likeCount}
        </Text>
      </TouchableOpacity>

      <Spacer type="width" value={15} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={icon_comments} style={{ width: 15, height: 15 }} />
        <Spacer type="width" value={5} />
        <Text style={{ fontSize: 15, color: '#4490d8', fontWeight: '500' }}>
          {commentCount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#28292A',
  },
  feedHeaderText: {
    color: '#4b5159',
    fontWeight: '500',
  },
  feedContentText: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontWeight: '500',
  },
  footerContainer: {
    flexDirection: 'row',
  },
});
