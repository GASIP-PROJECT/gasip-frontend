import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';

import { MMKVStorage } from '@api/mmkv';
import { likeComment, likeCommentCancel } from '@api/index';
import { getTimeDifference } from '@utils/timeUtil';

import useCommentEditStore from '@store/commentEditStore';

import FeedCommentReply from './FeedCommentReply';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { type FeedComment } from 'types/searchTypes';

import icon_comment from '@assets/icon_comment.png';
import icon_thumbsup from '@assets/icon_thumbsup.png';
import icon_dots_vertical from '@assets/icon_dots_vertical.png';

interface FeedCommentProps {
  isLastElement: boolean;
  commentData: FeedComment;
  handleReplyCommentPress: (commentId: number, commentNickname: string) => void;
  handleCommentEditConfirm: () => void;
  isSelectedForEditing: boolean;
  scrollTo: (y: number) => void;
}

export default function FeedComment({
  isLastElement,
  commentData,
  handleReplyCommentPress,
  handleCommentEditConfirm,
  isSelectedForEditing,
  scrollTo,
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

  const {
    isCommentEditing,

    deleteComment,
    setNewComment,
    toggleUpdateFeed,
    setIsCommentEditing,
    setSelectedCommentId,
  } = useCommentEditStore();

  const [showCommentActionMenu, setShowCommentActionMenu] = useState(false);

  const getBorderBottomWidth = () => {
    if (commentChildren.length !== 0) return 1;

    return isLastElement ? 1 : 0;
  };

  const commentContainerBorderStyle =
    isCommentEditing && isSelectedForEditing
      ? { borderWidth: 1, borderColor: COLORS.BLUE_PRIMARY }
      : {
          borderTopWidth: 1,
          borderBottomWidth: getBorderBottomWidth(),
          borderColor: COLORS.GRAY_200,
        };

  const handleLikePress = async (isLike: boolean, commentId: number) => {
    if (isLike) {
      await likeCommentCancel(commentId, postId);
    } else {
      await likeComment(commentId, postId);
    }

    toggleUpdateFeed();
  };

  const handleReplyButtonPress = () => {
    handleReplyCommentPress(commentId, nickName);
    scrollTo(positionY);
  };

  // TODO - commentAction과 feedAction 분리 필요
  const openCommentActionsModal = () => {
    setShowCommentActionMenu(true);
  };

  const closeCommentActionsModal = () => {
    setShowCommentActionMenu(false);
  };

  const handleCommentDeletePress = () => {
    deleteComment(commentId);
  };

  const [positionY, setPositionY] = useState(0);

  // TODO - 대댓글에 대해서는 각 댓글에서 객체 형태로 positionY를 저장하고 이를 Scroll하기 위해서 사용
  // 배열을 사용해서 Index로 접근하려고 했으나, 배열에 컴포넌트의 onLayout으로 계산된 y값이 데이터 순서대로 입력되지 않았음.
  // 객체를 활용해서 commentId를 key로 하여 y값을 저장하고 사용함.
  const [replyYpositions, setReplyYPositions] = useState({});

  // 수정 버튼을 눌렀을 때 이뤄져야 하는 처리
  const handleCommentEditPress = () => {
    setShowCommentActionMenu(false);
    setNewComment(content);
    setSelectedCommentId(commentId);
    setIsCommentEditing(true);
    scrollTo(positionY);
  };

  return (
    <View
      onLayout={e => {
        const { y } = e.nativeEvent.layout;
        setPositionY(y);
      }}
    >
      <View style={[styles.contentContainer, commentContainerBorderStyle]}>
        <CommentHeader
          regDate={regDate}
          commenterNickname={nickName}
          memberId={memberId}
          openCommentActionsModal={openCommentActionsModal}
        />

        {showCommentActionMenu && (
          <ActionMenu
            handleEditPress={handleCommentEditPress}
            handleDeletePress={handleCommentDeletePress}
          />
        )}

        {showCommentActionMenu && (
          <ActionMenuTransparendBackdrop onPress={closeCommentActionsModal} />
        )}

        <Spacer type="height" value={6} />
        <CommentBody
          content={content}
          isSelectedForEditing={isSelectedForEditing}
        />
        <Spacer type="height" value={16} />
        <CommentFooter
          likeCount={commentLike}
          commentChildrenCount={commentChildren.length}
          handleLikePress={() => handleLikePress(isCommentLike, commentId)}
          handleReplyButtonPress={handleReplyButtonPress}
          isCommentLike={isCommentLike}
        />
      </View>

      {commentChildren.map((commentChild, index) => {
        return (
          <View
            key={index.toString()}
            style={{
              borderBottomWidth: index !== commentChildren.length - 1 ? 1 : 0,
              borderBottomColor: COLORS.GRAY_200,
            }}
            onLayout={e => {
              const { y } = e.nativeEvent.layout;
              setReplyYPositions(prevState => ({
                ...prevState,
                [commentChild.commentId]: y + positionY,
              }));
            }}
          >
            <FeedCommentReply
              reply={commentChild}
              handleLikePress={handleLikePress}
              scrollTo={() => {
                scrollTo(replyYpositions[commentChild.commentId]);
              }}
            />
          </View>
        );
      })}
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

const CommentBody = ({
  content,
  isSelectedForEditing,
}: {
  content: string;
  isSelectedForEditing: boolean;
}) => {
  const { newComment, isCommentEditing, setIsCommentEditing, setNewComment } =
    useCommentEditStore();

  if (isCommentEditing && isSelectedForEditing)
    return (
      <TextInput
        value={newComment}
        onChangeText={text => setNewComment(text)}
        style={{ flex: 1, color: COLORS.BLACK }}
        multiline
        autoFocus
        onBlur={() => setIsCommentEditing(false)}
      />
    );
  return <GSText style={styles.commentBodyText}>{content}</GSText>;
};

const CommentFooter = ({
  likeCount,
  commentChildrenCount,
  handleLikePress,
  handleReplyButtonPress,
  isCommentLike,
}: {
  likeCount: number | null;
  commentChildrenCount: number;
  handleLikePress: () => void;
  handleReplyButtonPress: () => void;
  isCommentLike: boolean;
}) => {
  const iconTextGap = 3;

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={handleLikePress}
      >
        <Image
          source={icon_thumbsup}
          style={{
            width: 20,
            height: 20,
            tintColor: isCommentLike ? COLORS.BLUE_PRIMARY : COLORS.GRAY_400,
          }}
        />
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

const ActionMenu = ({ handleEditPress, handleDeletePress }) => {
  return (
    <View style={styles.actionMenuContainer}>
      <TouchableOpacity
        style={styles.actionMenuItemContainer}
        onPress={handleEditPress}
      >
        <GSText style={styles.actionMenuText}>수정하기</GSText>
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.BLUE_LIGHT_200,
          width: '100%',
        }}
      />
      <TouchableOpacity
        style={styles.actionMenuItemContainer}
        onPress={handleDeletePress}
      >
        <GSText style={styles.actionMenuText}>삭제하기</GSText>
      </TouchableOpacity>
    </View>
  );
};

const ActionMenuTransparendBackdrop = ({ onPress }) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: -500,
        left: -100,
        width: 1000,
        height: 1000,
        backgroundColor: 'transparent',
        zIndex: 1,
      }}
    >
      <TouchableOpacity
        style={{ width: '100%', height: '100%' }}
        onPress={onPress}
      >
        <View />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
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
  actionMenuContainer: {
    position: 'absolute',
    top: -30,
    right: 35,
    height: 72,
    width: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLUE_PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 2,
    borderWidth: 1,
    borderColor: COLORS.BLUE_LIGHT_200,
  },
  actionMenuItemContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  actionMenuText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.BLUE_LIGHT_100,
  },
});
