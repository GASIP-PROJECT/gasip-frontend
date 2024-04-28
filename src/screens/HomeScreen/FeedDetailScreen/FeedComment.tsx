import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { likeComment, likeCommentCancel } from '@api/index';
import { getTimeDifference } from '@utils/timeUtil';

import FeedCommentReply from './FeedCommentReply';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { type FeedComment } from 'types/searchTypes';

interface FeedCommentProps {
  commentData: FeedComment;
  setUpdateFeed: Dispatch<SetStateAction<boolean>>;
  handleReplyCommentPress: (commentId: number, commentNickname: string) => void;
}

export default function FeedComment({
  commentData,
  setUpdateFeed,
  handleReplyCommentPress,
}: FeedCommentProps) {
  if (commentData === null) return <View />;

  const {
    postId,
    commentId,
    content,
    commentLike,
    commentChildren,
    regDate,
    isCommentLike,
    nickName,
  } = commentData;

  const handleLikePress = async () => {
    if (isCommentLike) {
      await likeCommentCancel(commentId, postId);
    } else {
      await likeComment(commentId, postId);
    }

    setUpdateFeed(prev => !prev);
  };

  const handleReplyButtonPress = () => {
    handleReplyCommentPress(commentId, nickName);
  };

  return (
    <View>
      <CommentHeader regDate={regDate} commenterNickname={nickName} />
      <Spacer type="height" value={5} />
      <CommentBody content={content} />
      <Spacer type="height" value={10} />
      <CommentFooter
        likeCount={commentLike}
        commentChildrenCount={commentChildren.length}
        handleLikePress={handleLikePress}
        handleReplyButtonPress={handleReplyButtonPress}
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
  handleLikePress,
  handleReplyButtonPress,
}: {
  likeCount: number | null;
  commentChildrenCount: number;
  handleLikePress: () => void;
  handleReplyButtonPress: () => void;
}) => {
  const iconTextGap = 3;

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={handleLikePress}
      >
        <GSIcon name="heart" size={20} color="tomato" />
        <Spacer type="width" value={iconTextGap} />
        <Text style={styles.iconText}>{likeCount || 0}</Text>
      </TouchableOpacity>

      <Spacer type="width" value={15} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <GSIcon name="chatbox" size={20} color="#4F709C" />
        <Spacer type="width" value={iconTextGap} />
        <Text style={styles.iconText}>{commentChildrenCount}</Text>
      </View>

      <Spacer type="width" value={15} />

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={handleReplyButtonPress}
      >
        <Text style={styles.iconText}>답글달기</Text>
      </TouchableOpacity>
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
