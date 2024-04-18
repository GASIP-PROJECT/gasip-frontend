import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import FeedCommentReply from './FeedCommentReply';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { type FeedComment } from 'types/searchTypes';

import icon_like from '@assets/icon_like.png';
import icon_comments from '@assets/icon_comments.png';

// TODO - any 수정 필요
export default function FeedComment({
  commentData,
}: {
  commentData: FeedComment;
}) {
  if (commentData === null) return <View />;

  const { content, commentLike, commentChildren } = commentData;

  return (
    <View>
      <CommentHeader regDate="2021-08-01" userNickName="nickName" />
      <Spacer type="height" value={5} />
      <CommentBody content={content} />
      <Spacer type="height" value={5} />
      <CommentFooter
        likeCount={commentLike}
        commentChildrenCount={commentChildren.length}
      />
      <Spacer type="height" value={10} />
      <View style={styles.bottomLine} />
      <Spacer type="height" value={5} />
      {commentChildren.map(commentChild => {
        return <FeedCommentReply reply={commentChild} />;
      })}
    </View>
  );
}

const CommentHeader = ({
  regDate,
  userNickName,
}: {
  regDate: string;
  userNickName: string;
}) => {
  // TODO - 함수 구현
  const getFeedCreatedTimeString = () => {
    return regDate;
  };

  return (
    <Text style={styles.commentHeaderText}>
      {getFeedCreatedTimeString()} | {userNickName}
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
  return (
    <View style={styles.footerContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={icon_like} style={{ width: 15, height: 15 }} />
        <Spacer type="width" value={5} />
        <Text style={{ fontSize: 15, color: 'red', fontWeight: '500' }}>
          {likeCount || 0}
        </Text>
      </View>

      <Spacer type="width" value={15} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={icon_comments} style={{ width: 15, height: 15 }} />
        <Spacer type="width" value={5} />
        <Text style={{ fontSize: 15, color: '#4490d8', fontWeight: '500' }}>
          {commentChildrenCount}
        </Text>
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
    fontSize: 20,
    fontWeight: '500',
  },
  footerContainer: {
    flexDirection: 'row',
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.WHITE,
  },
});
