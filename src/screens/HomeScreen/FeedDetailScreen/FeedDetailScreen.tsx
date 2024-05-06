import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';

import { deleteFeed, getFeedData } from '@api/index';

import FeedContent from './FeedContent';
import FeedComment from './FeedComment';
import FeedEditModal from './FeedEditModal';
import FeedReplyInput from './FeedReplyInput';
import FeedActionsModal from './FeedActionsModal';

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
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [feedData, setFeedData] = useState<Feed | null>(null);
  const [updateFeed, setUpdateFeed] = useState(false);

  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  const [replyCommentNickname, setReplyCommentNickname] = useState<
    string | null
  >(null);

  const [showFeedEditModal, setShowFeedEditModal] = useState(false);

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
    actionSheetRef?.current?.show();
  };

  const handleFeedDeletePress = async () => {
    actionSheetRef?.current?.hide();
    await deleteFeed(feedData?.postId);
    navigation.goBack();
  };

  const handleFeedEditPress = () => {
    actionSheetRef?.current?.hide();

    // TODO - setTimeout 제거 필요
    setTimeout(() => {
      setShowFeedEditModal(true);
    }, 500);
  };

  useEffect(() => {
    const fetchFeedData = async () => {
      const feedData = await getFeedData(postId);
      setFeedData(feedData);
    };

    fetchFeedData();
  }, [updateFeed]);

  return (
    <SafeAreaLayout noBottomPadding>
      <GSHeader
        title={`${feedData?.memberNickname} 님의 게시글` || ''}
        leftComponent={
          <Image source={icon_goback} style={{ width: 28, height: 28 }} />
        }
        onLeftComponentPress={navigation.goBack}
      />
      <ScrollView style={styles.container}>
        {feedData !== null ? (
          <>
            {/* 교수님에 대한 글인 경우 표시되는 교수님 이름 */}
            {feedData.profId !== 0 && (
              <GSText style={styles.professorNameText}>
                {feedData.profName} 교수님
              </GSText>
            )}
            <Spacer type="height" value={14} />

            {/* 피드 내용 */}
            <FeedContent
              feedData={feedData}
              setUpdateFeed={setUpdateFeed}
              openFeedActionsModal={openFeedActionsModal}
            />
            <Spacer type="height" value={10} />

            {/* 댓글  */}
            {feedData?.comments.length > 0 && (
              <View>
                <GSText style={styles.commentTitleText}>
                  댓글 {`(${feedData.commentCount}개)`}
                </GSText>
                <Spacer type="height" value={6} />

                {feedData.comments.map((comment, index) => (
                  <FeedComment
                    key={index.toString()}
                    commentData={comment}
                    setUpdateFeed={setUpdateFeed}
                    handleReplyCommentPress={handleReplyCommentPress}
                  />
                ))}
              </View>
            )}
          </>
        ) : (
          <Text>로딩중...</Text>
        )}
        <Spacer type="height" value={100} />
      </ScrollView>

      {replyCommentNickname && (
        <CommentReplyIndicator
          commentNickname={replyCommentNickname}
          resetReplyCommentData={resetReplyCommentData}
        />
      )}
      <FeedReplyInput
        postId={postId}
        replyCommentId={replyCommentId}
        commentTextInputRef={commentTextInputRef}
        setUpdateFeed={setUpdateFeed}
        resetReplyCommentData={resetReplyCommentData}
      />
      <FeedActionsModal
        actionSheetRef={actionSheetRef}
        handleFeedDeletePress={handleFeedDeletePress}
        handleFeedEditPress={handleFeedEditPress}
      />
      <FeedEditModal
        postId={postId}
        prevContent={feedData?.content || ''}
        isVisible={showFeedEditModal}
        setUpdateFeed={setUpdateFeed}
        setIsVisible={setShowFeedEditModal}
      />
    </SafeAreaLayout>
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
      <Text style={styles.commentReplyIndicatorText}>
        {commentNickname} 님에게 남기는 답글
      </Text>
      <TouchableOpacity onPress={resetReplyCommentData}>
        <GSIcon name="close-outline" size={20} color={COLORS.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.GRAY_500,
    alignSelf: 'center',
  },
  commentTitleText: {
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 16,
  },
});
