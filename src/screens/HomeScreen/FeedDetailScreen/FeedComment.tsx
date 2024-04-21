import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getTimeDifference } from '@utils/timeUtil';

import FeedCommentReply from './FeedCommentReply';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { type FeedComment } from 'types/searchTypes';

export default function FeedComment({
  commentData,
}: {
  commentData: FeedComment;
}) {
  if (commentData === null) return <View />;

  const { content, commentLike, commentChildren, regDate, memberName } =
    commentData;

  return (
    <View>
      <CommentHeader regDate={regDate} commenterNickname={memberName} />
      <Spacer type="height" value={5} />
      <CommentBody content={content} />
      <Spacer type="height" value={10} />
      <CommentFooter
        likeCount={commentLike}
        commentChildrenCount={commentChildren.length}
      />
      <Spacer type="height" value={15} />
      {commentChildren.map((commentChild, index) => {
        return <FeedCommentReply key={index.toString()} reply={commentChild} />;
      })}
    </View>
  );
}

const CommentHeader = ({
  regDate,
  commenterNickname,
}: {
  regDate: string;
  commenterNickname: string;
}) => {
  const timeString = getTimeDifference(regDate);

  return (
    <Text style={styles.commentHeaderText}>
      <Text style={{ color: '#B4B4B3' }}>{commenterNickname}</Text> |{' '}
      {timeString}
    </Text>
  );
};

const CommentBody = ({ content }: { content: string }) => {
  return <Text style={styles.commentBodyText}>{content}</Text>;
};

const CommentFooter = ({
  likeCount,
  commentChildrenCount,
}: {
  likeCount: number | null;
  commentChildrenCount: number;
}) => {
  const iconTextGap = 3;

  return (
    <View style={styles.footerContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <GSIcon name="heart" size={20} color="tomato" />
        <Spacer type="width" value={iconTextGap} />
        <Text style={styles.iconText}>{likeCount || 0}</Text>
      </View>

      <Spacer type="width" value={15} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <GSIcon name="chatbox" size={20} color="#4F709C" />
        <Spacer type="width" value={iconTextGap} />
        <Text style={styles.iconText}>{commentChildrenCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentHeaderText: {
    fontSize: 14,
    color: '#4b5159',
    fontWeight: '500',
  },
  commentBodyText: {
    color: COLORS.WHITE,
    fontSize: 16,
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
