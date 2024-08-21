import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { deleteFeed, getFeedData } from '@api/index';

import useCommentEditStore from '@store/commentEditStore';
import useCommentActionMenuBackdropStore from '@store/commentActionMenuBackdropStore';

import FeedHeader from './FeedHeader';
import FeedContent from './FeedContent';
import FeedComments from './FeedComments';
import FeedEditModal from './FeedEditModal';
import FeedReplyInput from './FeedReplyInput';
import BottomAreaContainer from './BottomAreaContainer';
import FeedActionMenuBackdrop from './FeedActionMenuBackdrop';
import ReplyEditCompleteButton from './ReplyEditCompleteButton';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import GSIcon from '@components/common/GSIcon';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';
import { type Feed } from 'types/searchTypes';

// 신고기능 및 UI를 추가하려고 하는데 복잡해서 수정이 어렵다. 코드에 문제가 있는 듯.
// 문제부터 파악해보자.

// 너무 이런 저런 함수가 많이 컴포넌트 안에서 선언되어 있음.
// -> 컴포넌트가 길어지고 로직 보기가 어려움

// 컴포넌트간 hierarchy 레벨이 맞지 않음.

// 피드 상세 화면
// 의도가 무엇인지? -> 피드 내용 및 댓글을 표시한다.
// 컴포넌트의 기능은 무엇인지? -> 역할별로 일단 먼저 카테고라이징을 해보자.
// 어떻게 표현해야되는지?

// TODO - type 선언 필요
export default function FeedDetailScreen({ route, navigation }) {
  const { postId } = route.params;

  const commentTextInputRef = useRef<TextInput>(null);
  const {
    updateFeed,
    newComment,
    isCommentEditing,
    selectedCommentId,
    editComment,
  } = useCommentEditStore();

  const [feedData, setFeedData] = useState<Feed | null>(null);

  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  const [replyCommentNickname, setReplyCommentNickname] = useState<
    string | null
  >(null);

  const [showFeedActionMenu, setShowFeedActionMenu] = useState(false);
  const [showFeedEditModal, setShowFeedEditModal] = useState(false);

  // 댓글 모달 표시 관련 변수
  const {
    showCommentActionMenuBackdrop,
    closeBackdrop,
    showCommentReplyBackdrop,
  } = useCommentActionMenuBackdropStore();

  // 상단 좋아요 버튼 옆 댓글 버튼 눌렀을 때 댓글창 focus되도록 기획하였음.
  const handleCommentButtonPress = () => {
    if (commentTextInputRef.current) {
      commentTextInputRef.current.focus();
    }
  };

  const handleReplyCommentPress = (
    commentId: number,
    commentNickname: string,
  ) => {
    setReplyCommentId(commentId);
    setReplyCommentNickname(commentNickname);

    if (commentTextInputRef.current) {
      commentTextInputRef.current.focus();
    }
  };

  const resetReplyCommentData = () => {
    setReplyCommentId(null);
    setReplyCommentNickname(null);
  };

  const openFeedActionsModal = () => {
    setShowFeedActionMenu(true);
  };

  const handleFeedDeletePress = async () => {
    setShowFeedActionMenu(false);
    closeBackdrop();
    await deleteFeed(feedData?.postId);
    navigation.goBack();
  };

  const handleFeedEditPress = () => {
    setShowFeedActionMenu(false);
    closeBackdrop();

    // TODO - setTimeout 제거 필요
    setTimeout(() => {
      setShowFeedEditModal(true);
    }, 0);
  };

  const handleCommentEditConfirmPress = () => {
    editComment(newComment, selectedCommentId);
  };

  useEffect(() => {
    const fetchFeedData = async () => {
      const feedData = await getFeedData(postId);
      setFeedData(feedData);
    };

    fetchFeedData();
  }, [updateFeed]);

  const scrollViewRef = useRef(null);

  const scrollTo = (y: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: y, animated: true });
    }
  };

  if (feedData === null) return <View />;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
      // TODO - keyboardVerticalOffset 값 안드에서도 확인 필요
      keyboardVerticalOffset={Platform.select({
        ios: 0,
        android: 500,
      })}
    >
      <SafeAreaLayout noBottomPadding backgroundColor={COLORS.WHITE}>
        <FeedHeader
          memberNickname={feedData?.memberNickname}
          profId={feedData?.profId}
          profName={feedData?.profName}
        />

        <ScrollView style={styles.container} ref={scrollViewRef}>
          {/* TODO(리팩토링) - 여러 layer로 구현되어 있는 이유에 대해서 주석 필요 */}
          {showCommentActionMenuBackdrop && <FeedActionMenuBackdrop />}
          {/* 피드 내용 */}

          <FeedContent
            feedData={feedData}
            openFeedActionsModal={openFeedActionsModal}
            handleCommentButtonPress={handleCommentButtonPress}
          />

          <FeedComments
            comments={feedData.comments}
            handleReplyCommentPress={handleReplyCommentPress}
            scrollTo={scrollTo}
          />

          {/* TODO(리팩토링) - 피드 액션 메뉴 관련 컴포넌트들 구조가 이해하기 어려운데 이 문제를 해결할 방법을 찾아야 함. */}

          {/* 피드 액션메뉴 컴포넌트들은 position absolute로 처리되어 있음.(디자인) backdrop은 현재 전체 화면을 가리지 못하는 이슈가 있음. */}
          {/* 피드 관련 액션메뉴(수정/삭제) */}

          {showFeedActionMenu && (
            <ActionMenu
              handleFeedEditPress={handleFeedEditPress}
              handleFeedDeletePress={handleFeedDeletePress}
            />
          )}
          {showFeedActionMenu && (
            <ActionMenuTransparentBackdrop
              onPress={() => setShowFeedActionMenu(false)}
            />
          )}
          {/* 피드 관련 액션메뉴 켜져있을 때 배경을 눌러서 꺼지도록 하기 위해서 필요한 backdrop */}

          <Spacer type="height" value={350} />
        </ScrollView>

        {replyCommentNickname && (
          <CommentReplyIndicator
            commentNickname={replyCommentNickname}
            resetReplyCommentData={resetReplyCommentData}
          />
        )}

        {/* TextInput, Button이 렌더링 되는 영역을 동일하게 처리하기 위해서 Container컴포넌트 안에 렌더링 하는 형태로 처리 */}
        <BottomAreaContainer>
        {isCommentEditing ? (
            <ReplyEditCompleteButton onPress={handleCommentEditConfirmPress} />
        ) : (
          <FeedReplyInput
            postId={postId}
            replyCommentId={replyCommentId}
            commentTextInputRef={commentTextInputRef}
            resetReplyCommentData={resetReplyCommentData}
          />
        )}
        </BottomAreaContainer>

        <FeedEditModal
          postId={postId}
          prevContent={feedData?.content || ''}
          isVisible={showFeedEditModal}
          setIsVisible={setShowFeedEditModal}
        />
        {(showCommentActionMenuBackdrop || showCommentReplyBackdrop) && (
          <FeedActionMenuBackdrop />
        )}
        {showFeedActionMenu && (
          <ActionMenuTransparentOuterBackdrop
            onPress={() => setShowFeedActionMenu(false)}
          />
        )}
      </SafeAreaLayout>
      {/* 댓글 수정/삭제 모달 표시될 때 백그라운드 눌러서 닫기 위한 Component */}
    </KeyboardAvoidingView>
  );
}

// TODO(리팩토링) - 컴포넌트 안에 선언된 컴포넌트들 별도 컴포넌트 파일로 분리

const CommentReplyIndicator = ({
  commentNickname,
  resetReplyCommentData,
}: {
  commentNickname: string;
  resetReplyCommentData: () => void;
}) => {
  return (
    <View style={styles.commentReplyIndicatorContainer}>
      <GSText
        style={styles.commentReplyIndicatorText}
        numberOfLines={2}
        adjustFontSizeToFit
      >
        {commentNickname} 님의 댓글에 답글 다는 중
      </GSText>
      <TouchableOpacity onPress={resetReplyCommentData}>
        <GSIcon name="close-outline" size={20} color={COLORS.GRAY_500} />
      </TouchableOpacity>
    </View>
  );
};

const ActionMenu = ({ handleFeedEditPress, handleFeedDeletePress }) => {
  // 누른 사람이 글 작성자인 경우 -> 삭제/수정하기 메뉴 표시
  // 누른 사람이 글 작성자가 아닌 경우 -> 쪽지하기/신고하기 메뉴 표시
  return (
    <View style={styles.actionMenuContainer}>
      <TouchableOpacity
        style={styles.actionMenuItemContainer}
        onPress={handleFeedEditPress}
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
        onPress={handleFeedDeletePress}
      >
        <GSText style={styles.actionMenuText}>삭제하기</GSText>
      </TouchableOpacity>
    </View>
  );
};

// TODO - Backdrop관련 구조 수정 필요
const ActionMenuTransparentBackdrop = ({ onPress }) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: -100,
        width: 1000,
        height: 1000,
        backgroundColor: 'transparent',
        zIndex: 1000,
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

const ActionMenuTransparentOuterBackdrop = ({ onPress }) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
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
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    zIndex: 3,
  },
  commentReplyIndicatorContainer: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    height: 34,
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: COLORS.BLUE_PRIMARY,
    borderBottomColor: COLORS.BLUE_PRIMARY,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  commentReplyIndicatorText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.GRAY_500,
  },
  actionMenuContainer: {
    position: 'absolute',
    top: 0,
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
    zIndex: 1002,
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
