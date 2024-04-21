import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { likeFeed, likeFeedCancel } from '@api/index';
import { getTimeDifference } from '@utils/timeUtil';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { type Feed } from 'types/searchTypes';

export default function FeedContent({ feedData }: { feedData: Feed | null }) {
  if (feedData === null) return <View />;

  const { content, regDate, likeCount, postId, memberNickname } = feedData;

  console.log(feedData);

  return (
    <View style={styles.container}>
      <FeedContentHeader regDate={regDate} memberNickname={memberNickname} />
      <Spacer type="height" value={10} />
      <FeedContentText content={content} />
      <Spacer type="height" value={10} />
      <FeedContentFooter likeCount={likeCount} postId={postId} />
    </View>
  );
}
const FeedContentHeader = ({
  regDate,
  memberNickname,
}: {
  regDate: string;
  memberNickname: string;
}) => {
  const timeString = getTimeDifference(regDate);

  return (
    <Text style={styles.feedHeaderText}>
      <Text style={{ color: '#B4B4B3' }}>{memberNickname}</Text> | {timeString}
    </Text>
  );
};

const FeedContentText = ({ content }: { content: string }) => {
  return <Text style={styles.feedContentText}>{content}</Text>;
};

const FeedContentFooter = ({
  likeCount,
  postId,
}: {
  likeCount: number;
  postId: number;
}) => {
  const iconTextGap = 3;

  const handleLikePress = async () => {
    // await likeFeed(postId);
    await likeFeedCancel(postId);
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={handleLikePress}
      >
        <GSIcon name="heart" size={20} color="tomato" />
        <Spacer type="width" value={iconTextGap} />
        <Text style={styles.iconText}>{likeCount}</Text>
      </TouchableOpacity>
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
  iconText: {
    fontSize: 15,
    color: '#B6BBC4',
    fontWeight: '500',
  },
});
