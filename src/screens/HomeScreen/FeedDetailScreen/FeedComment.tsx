import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';

import { MMKVStorage } from '@api/mmkv';
import { deleteComment, likeComment, likeCommentCancel } from '@api/index';
import { getTimeDifference } from '@utils/timeUtil';

import FeedCommentReply from './FeedCommentReply';
import FeedActionsModal from './FeedActionsModal';
import CommentEditModal from './CommentEditModal';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { type FeedComment } from 'types/searchTypes';

import icon_comment from '@assets/icon_comment.png';
import icon_thumbsup from '@assets/icon_thumbsup.png';
import icon_dots_vertical from '@assets/icon_dots_vertical.png';

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
  const [showCommentEditModal, setShowCommentEditModal] = useState(false);

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

  const handleCommentDeletePress = async () => {
    actionSheetRef.current?.hide();
    await deleteComment(commentId);
    setUpdateFeed(prev => !prev);
  };

  const handleCommentEditPress = async () => {
    actionSheetRef.current?.hide();
    setTimeout(() => {
      setShowCommentEditModal(true);
    }, 500);
  };

  return (
    <View>
      <View style={styles.contentContainer}>
        <CommentHeader
          regDate={regDate}
          commenterNickname={nickName}
          memberId={memberId}
          openCommentActionsModal={openCommentActionsModal}
        />

        <Spacer type="height" value={6} />
        <CommentBody content={content} />
        <Spacer type="height" value={16} />
        <CommentFooter
          likeCount={commentLike}
          commentChildrenCount={commentChildren.length}
          handleLikePress={handleLikePress}
          handleReplyButtonPress={handleReplyButtonPress}
        />
      </View>

      {commentChildren.map((commentChild, index) => {
        return (
          <View
            style={{
              borderBottomWidth: index !== commentChildren.length - 1 ? 1 : 0,
              borderBottomColor: COLORS.GRAY_200,
            }}
          >
            <FeedCommentReply key={index.toString()} reply={commentChild} />
          </View>
        );
      })}
      <FeedActionsModal
        actionSheetRef={actionSheetRef}
        handleFeedDeletePress={handleCommentDeletePress}
        handleFeedEditPress={handleCommentEditPress}
        paddingBottom={30}
      />
      <CommentEditModal
        isVisible={showCommentEditModal}
        commentId={commentId}
        prevComment={content}
        setIsVisible={setShowCommentEditModal}
        setUpdateFeed={setUpdateFeed}
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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <GSText style={styles.commentHeaderText}>{commenterNickname}</GSText>
        <Spacer type="width" value={6} />
        <GSText style={styles.timeStringText}>{timeString}</GSText>
      </View>

      {isCurrentUserCommentAuthor && (
        <TouchableOpacity onPress={openCommentActionsModal}>
          <Image
            source={icon_dots_vertical}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const CommentBody = ({ content }: { content: string }) => {
  return <GSText style={styles.commentBodyText}>{content}</GSText>;
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
        <Image source={icon_thumbsup} style={{ width: 20, height: 20 }} />
        <Spacer type="width" value={iconTextGap} />
        <GSText style={styles.iconText}>{likeCount || 0}</GSText>
      </TouchableOpacity>

      <Spacer type="width" value={8} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={icon_comment} style={{ width: 20, height: 20 }} />
        <Spacer type="width" value={iconTextGap} />
        <GSText style={styles.iconText}>{commentChildrenCount}</GSText>
      </View>

      <Spacer type="width" value={15} />

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={handleReplyButtonPress}
      >
        <GSText style={styles.iconText}>답글달기</GSText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.GRAY_200,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  commentHeaderText: {
    fontSize: 12,
    fontWeight: '600',
  },
  commentBodyText: {
    fontSize: 14,
    fontWeight: '400',
  },
  footerContainer: {
    flexDirection: 'row',
  },
  iconText: {
    fontSize: 12,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
  commentHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeStringText: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.GRAY_500,
  },
});
