import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import {
  deleteFeed,
  editComment,
  getFeedData,
  getProfessorData,
} from '@api/index';

import FeedContent from './FeedContent';
import FeedComment from './FeedComment';
import FeedEditModal from './FeedEditModal';
import FeedReplyInput from './FeedReplyInput';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import GSIcon from '@components/common/GSIcon';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';
import { type Feed } from 'types/searchTypes';

import icon_goback from '@assets/icon_goback.png';

// TODO - type 선언 필요
export default function FeedDetailScreen({ route, navigation }) {
  const { postId } = route.params;

  const commentTextInputRef = useRef<TextInput>(null);

  const [feedData, setFeedData] = useState<Feed | null>(null);
  const [updateFeed, setUpdateFeed] = useState(false);

  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  const [replyCommentNickname, setReplyCommentNickname] = useState<
    string | null
  >(null);

  const [showFeedActionMenu, setShowFeedActionMenu] = useState(false);
  const [showFeedEditModal, setShowFeedEditModal] = useState(false);
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );

  const [newComment, setNewComment] = useState('');

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
    await deleteFeed(feedData?.postId);
    navigation.goBack();
  };

  const handleFeedEditPress = () => {
    setShowFeedActionMenu(false);

    // TODO - setTimeout 제거 필요
    setTimeout(() => {
      setShowFeedEditModal(true);
    }, 0);
  };

  const handleCommentEditConfirmPress = async () => {
    if (newComment === '') {
      Alert.alert('내용을 입력해주세요.');
      return;
    }
    if (selectedCommentId === null) return;

    await editComment(selectedCommentId, newComment);
    setUpdateFeed(prev => !prev);
    setIsCommentEditing(false);
    setNewComment('');
  };

  const handleProfNamePress = async () => {
    if (feedData?.profId === undefined) return;

    const professorData = await getProfessorData(feedData?.profId);

    navigation.navigate('ProfessorDetailScreen', {
      professorData: professorData,
    });
  };

  useEffect(() => {
    const fetchFeedData = async () => {
      const feedData = await getFeedData(postId);
      setFeedData(feedData);
    };

    fetchFeedData();
  }, [updateFeed]);

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
        <View style={{ paddingHorizontal: 24 }}>
          <GSHeader
            title={`${feedData?.memberNickname} 님의 게시글` || ''}
            leftComponent={
              <Image source={icon_goback} style={{ width: 28, height: 28 }} />
            }
            onLeftComponentPress={navigation.goBack}
            paddingHorizontal={0}
          />

          {/* 교수님에 대한 글인 경우 표시되는 교수님 이름 */}
          {feedData?.profId !== 0 && (
            <TouchableOpacity onPress={handleProfNamePress}>
              <GSText style={styles.professorNameText}>
                {feedData?.profName} 교수님
              </GSText>
            </TouchableOpacity>
          )}

          <Spacer type="height" value={14} />

          <View
            style={{
              height: 1,
              backgroundColor: COLORS.GRAY_100,
            }}
          />
        </View>

        <ScrollView style={styles.container}>
          {/* 피드 내용 */}
          {/* TODO - shadow 제대로 된건가..? */}
          <View
            style={{
              overflow: 'hidden',
              backgroundColor: COLORS.WHITE,
              paddingBottom: 5,
            }}
          >
            <View style={styles.feedContentCotainer}>
              <FeedContent
                feedData={feedData}
                setUpdateFeed={setUpdateFeed}
                openFeedActionsModal={openFeedActionsModal}
              />
            </View>
          </View>

          <View
            style={{
              backgroundColor: COLORS.BG_MAIN,
              paddingHorizontal: 24,
              borderTopWidth: 1,
              borderColor: COLORS.BLUE_PRIMARY,
            }}
          >
            <Spacer type="height" value={8} />
            <GSText style={styles.commentTitleText}>
              댓글 {`(${feedData.commentCount}개)`}
            </GSText>
            <Spacer type="height" value={6} />

            {feedData.comments.map((comment, index) => (
              <FeedComment
                key={index.toString()}
                isLastElement={index === feedData.comments.length - 1}
                commentData={comment}
                setUpdateFeed={setUpdateFeed}
                handleReplyCommentPress={handleReplyCommentPress}
                isCommentEditing={isCommentEditing}
                setIsCommentEditing={setIsCommentEditing}
                setSelectedCommentId={setSelectedCommentId}
                handleCommentEditConfirm={handleCommentEditConfirmPress}
                newComment={newComment}
                setNewComment={setNewComment}
                isSelectedForEditing={
                  // TODO - optional 로 처리하지 않으면 null로 뜨는 이슈 체크
                  comment?.commentId === selectedCommentId
                }
              />
            ))}
          </View>

          {/* 피드 액션메뉴 컴포넌트들은 position absolute로 처리되어 있음.(디자인) backdrop은 현재 전체 화면을 가리지 못하는 이슈가 있음. */}
          {/* 피드 관련 액션메뉴(수정/삭제) */}
          {showFeedActionMenu && (
            <ActionMenu
              handleFeedEditPress={handleFeedEditPress}
              handleFeedDeletePress={handleFeedDeletePress}
            />
          )}
          {/* 피드 관련 액션메뉴 켜져있을 때 배경을 눌러서 꺼지도록 하기 위해서 필요한 backdrop */}
          {showFeedActionMenu && (
            <ActionMenuTransparendBackdrop
              onPress={() => setShowFeedActionMenu(false)}
            />
          )}
          <Spacer type="height" value={100} />
        </ScrollView>

        {replyCommentNickname && (
          <CommentReplyIndicator
            commentNickname={replyCommentNickname}
            resetReplyCommentData={resetReplyCommentData}
          />
        )}
        {isCommentEditing ? (
          <View
            style={{
              height: 56,
              paddingHorizontal: 16,
              justifyContent: 'center',
              backgroundColor: COLORS.WHITE,
              shadowColor: COLORS.BLUE_PRIMARY,
              shadowOffset: { width: 0, height: -8 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
              elevation: 5,
            }}
          >
            <TouchableOpacity
              style={{
                height: 40,
                backgroundColor: COLORS.BLUE_PRIMARY,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleCommentEditConfirmPress}
            >
              <GSText
                style={{ fontSize: 16, color: COLORS.WHITE, fontWeight: '600' }}
              >
                완료
              </GSText>
            </TouchableOpacity>
          </View>
        ) : (
          <FeedReplyInput
            postId={postId}
            replyCommentId={replyCommentId}
            commentTextInputRef={commentTextInputRef}
            setUpdateFeed={setUpdateFeed}
            resetReplyCommentData={resetReplyCommentData}
          />
        )}

        <FeedEditModal
          postId={postId}
          prevContent={feedData?.content || ''}
          isVisible={showFeedEditModal}
          setUpdateFeed={setUpdateFeed}
          setIsVisible={setShowFeedEditModal}
        />
      </SafeAreaLayout>
    </KeyboardAvoidingView>
  );
}

const CommentReplyIndicator = ({
  commentNickname,
  resetReplyCommentData,
}: {
  commentNickname: string;
  resetReplyCommentData: () => void;
}) => {
  return (
    <View style={styles.commentReplyIndicatorContainer}>
      <GSText style={styles.commentReplyIndicatorText}>
        {commentNickname} 님에게 남기는 답글
      </GSText>
      <TouchableOpacity onPress={resetReplyCommentData}>
        <GSIcon name="close-outline" size={20} color={COLORS.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

const ActionMenu = ({ handleFeedEditPress, handleFeedDeletePress }) => {
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

// TODO - height 100%에도 ScrollView 만큼 안가는 이유가 뭐야?
const ActionMenuTransparendBackdrop = ({ onPress }) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
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
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  commentReplyIndicatorContainer: {
    width: '100%',
    backgroundColor: '#3e3b3b',
    opacity: 0.5,
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentReplyIndicatorText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.WHITE,
  },
  professorNameText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.BLUE_PRIMARY,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  commentTitleText: {
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 16,
    lineHeight: 24,
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
  feedContentCotainer: {
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLUE_PRIMARY,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    elevation: 5,
    paddingHorizontal: 24,
  },
});
