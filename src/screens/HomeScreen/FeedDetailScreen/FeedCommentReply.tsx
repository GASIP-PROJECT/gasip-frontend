import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { MMKVStorage } from '@api/mmkv';
import { getTimeDifference } from '@utils/timeUtil';

import useCommentEditStore from '@store/commentEditStore';
import useCommentActionMenuBackdropStore from '@store/commentActionMenuBackdropStore';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { FeedComment } from 'types/searchTypes';

import icon_reply from '@assets/icon_reply.png';
import icon_thumbsup from '@assets/icon_thumbsup.png';
import icon_dots_vertical from '@assets/icon_dots_vertical.png';

export default function FeedCommentReply({
  reply,
  handleLikePress,
  scrollTo,
  index,
}: {
  reply: FeedComment;
  handleLikePress: (isLike: boolean, commentId: number) => void;
  scrollTo: () => void;
  index: number;
}) {
  const {
    content,
    commentLike,
    regDate,
    nickName,
    isCommentLike,
    memberId,
    commentId,
  } = reply;

  const {
    isCommentEditing,
    selectedCommentId,

    deleteComment,
    setNewComment,
    setIsCommentEditing,
    setSelectedCommentId,
  } = useCommentEditStore();

  const {
    showReplyBackdrop,
    showCommentReplyBackdrop,
    setCloseReplyActionMenu,
    closeReplyBackdrop,
    setSelectedReplyIndex,
  } = useCommentActionMenuBackdropStore();

  const isSelectedForEditing = commentId === selectedCommentId;

  const commentContainerBorderStyle =
    isCommentEditing && isSelectedForEditing
      ? { borderWidth: 1, borderColor: COLORS.BLUE_PRIMARY }
      : {};

  const [showActionMenu, setShowActionMenu] = useState(false);

  const handleReplyLikePress = () => {
    handleLikePress(isCommentLike, commentId);
  };

  // backdrop을 처리하기 위해서 필요한 작업은?
  // 모달 열 때 backdrop도 같이 연다.
  // backdrop을 눌렀을 때 모달이 같이 닫혀야 한다.

  const openCommentActionsModal = () => {
    setShowActionMenu(true);

    setSelectedReplyIndex(index);
    // backdrop을 열고,
    showReplyBackdrop(); // backdrop을 눌렀을 때 실행되어야 하는 모달 닫는 함수 저장
    // backdrop을 눌렀을 때 실행되어야 하는 모달 닫는 함수 저장
    setCloseReplyActionMenu(closeCommentActionsModal);
  };

  // 닫을 때,
  // 액션 메뉴 닫고,
  // backdrop 닫는데,
  // 이 때 closeReplyBackdrop이 실행되면
  // backdrop관리하는 상태 false + closeReplyActionMenu null로 초기화
  // TODO - 함수가 실행 중인데 null로 초기화하는게 안전한 접근인가?
  const closeCommentActionsModal = () => {
    setShowActionMenu(false);
    closeReplyBackdrop();
  };

  const handleCommentDeletePress = () => {
    deleteComment(commentId);
    closeReplyBackdrop();
  };

  // 수정 버튼을 눌렀을 때 이뤄져야 하는 처리
  const handleCommentEditPress = () => {
    setShowActionMenu(false);
    closeReplyBackdrop();
    setNewComment(content);
    setSelectedCommentId(commentId);
    setIsCommentEditing(true);
    scrollTo();
  };

  return (
    <View style={[styles.container, commentContainerBorderStyle]}>
      <Spacer type="height" value={5} />

      {showActionMenu && (
        <ActionMenu
          handleEditPress={handleCommentEditPress}
          handleDeletePress={handleCommentDeletePress}
        />
      )}

      {showCommentReplyBackdrop && (
        <ActionMenuTransparendBackdrop onPress={closeCommentActionsModal} />
      )}

      <ReplyHeader
        regDate={regDate}
        replierNickname={nickName}
        memberId={memberId}
        openCommentActionsModal={openCommentActionsModal}
      />
      <Spacer type="height" value={6} />
      <View style={{ paddingHorizontal: 20 }}>
        <ReplyBody
          content={content}
          isSelectedForEditing={isSelectedForEditing}
        />
        <Spacer type="height" value={16} />
        <ReplyFooter
          likeCount={commentLike}
          isCommentLike={isCommentLike}
          handleReplyLikePress={handleReplyLikePress}
        />
      </View>
    </View>
  );
}

const ReplyHeader = ({
  regDate,
  replierNickname,
  memberId,
  openCommentActionsModal,
}: {
  regDate: string;
  replierNickname: string;
  memberId: number;
  openCommentActionsModal: () => void;
}) => {
  const timeString = getTimeDifference(regDate);
  const isCurrentUserCommentAuthor =
    memberId === MMKVStorage.getNumber('memberId');

  return (
    <View style={styles.headerContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={icon_reply} style={{ width: 14, height: 14 }} />
        <Spacer type="width" value={6} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <GSText style={styles.replyHeaderText}>{replierNickname}</GSText>
          <Spacer type="width" value={6} />
          <GSText style={styles.timeStringText}>{timeString}</GSText>
        </View>
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

const ReplyBody = ({
  content,
  isSelectedForEditing,
}: {
  content: string;
  isSelectedForEditing: boolean;
}) => {
  const { newComment, isCommentEditing, setIsCommentEditing, setNewComment } =
    useCommentEditStore();

  if (isCommentEditing && isSelectedForEditing) {
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
  }

  return <GSText style={styles.replyBodyText}>{content}</GSText>;
};

const ReplyFooter = ({
  likeCount,
  isCommentLike,
  handleReplyLikePress,
}: {
  likeCount: number | null;
  isCommentLike: boolean;
  handleReplyLikePress: () => void;
}) => {
  const iconTextGap = 3;

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={handleReplyLikePress}
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
        zIndex: 4,
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
  container: {
    paddingVertical: 16,
    backgroundColor: COLORS.GRAY_100,
  },
  replyHeaderText: {
    fontSize: 12,
    fontWeight: '600',
  },
  replyBodyText: {
    fontSize: 14,
    fontWeight: '400',
  },
  footerContainer: {
    flexDirection: 'row',
  },
  iconText: {
    fontSize: 12,
    fontWeight: '500',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
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
    zIndex: 1000,
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
