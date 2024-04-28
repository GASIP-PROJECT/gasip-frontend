import React, { Dispatch, SetStateAction, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';

import { MMKVStorage } from '@api/mmkv';
import { likeComment, likeCommentCancel } from '@api/index';
import { getTimeDifference } from '@utils/timeUtil';

import FeedCommentReply from './FeedCommentReply';
import FeedActionsModal from './FeedActionsModal';

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
    memberId,
  } = commentData;

  const actionSheetRef = useRef<ActionSheetRef>(null);

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

  // TODO - commentAction과 feedAction 분리 필요
  const openCommentActionsModal = () => {
    actionSheetRef?.current?.show();
  };

  return (
    <View>
      <CommentHeader
        regDate={regDate}
        commenterNickname={nickName}
        memberId={memberId}
        openCommentActionsModal={openCommentActionsModal}
      />
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
      <FeedActionsModal
        actionSheetRef={actionSheetRef}
        handleFeedDeletePress={() => {}}
        handleFeedEditPress={() => {}}
        paddingBottom={30}
      />
    </View>
  );
}

const CommentHeader = ({
  regDate,
  commenterNickname,
  memberId,
  openCommentActionsModal,
}: {
  regDate: string;
  commenterNickname: string;
  memberId: number;
  openCommentActionsModal: () => void;
}) => {
  const timeString = getTimeDifference(regDate);
  const isCurrentUserCommentAuthor =
    memberId === MMKVStorage.getNumber('memberId');

  return (
    <View style={styles.commentHeaderContainer}>
      <Text style={styles.commentHeaderText}>
        <Text style={{ color: '#B4B4B3' }}>{commenterNickname}</Text> |{' '}
        {timeString}
      </Text>

      {isCurrentUserCommentAuthor && (
        <TouchableOpacity onPress={openCommentActionsModal}>
          <GSIcon name="ellipsis-horizontal" color="#B4B4B3" size={20} />
        </TouchableOpacity>
      )}
    </View>
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
  commentHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
