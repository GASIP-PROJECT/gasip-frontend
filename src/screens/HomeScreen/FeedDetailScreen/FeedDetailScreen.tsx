import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { getFeedData } from '@api/index';

import FeedContent from './FeedContent';
import FeedComment from './FeedComment';
import ProfessorInfo from './ProfessorInfo';
import FeedReplyInput from './FeedReplyInput';

import Spacer from '@components/common/Spacer';
import GSIcon from '@components/common/GSIcon';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';
import { type Feed } from 'types/searchTypes';

// TODO - type 선언 필요
export default function FeedDetailScreen({ route, navigation }) {
  const { postId } = route.params;

  const commentTextInputRef = useRef<TextInput>(null);

  const [feedData, setFeedData] = useState<Feed | null>(null);
  const [updateFeed, setUpdateFeed] = useState<boolean>(false);

  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  const [replyCommentNickname, setReplyCommentNickname] = useState<
    string | null
  >(null);

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
        title="게시글 상세"
        leftComponent={<GSIcon name="chevron-back-outline" />}
        onLeftComponentPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <Spacer type="height" value={10} />
        {feedData !== null ? (
          <>
            {feedData.profId !== 0 && (
              <ProfessorInfo
                profName={feedData.profName}
                majorName={feedData.majorName}
              />
            )}
            <Spacer type="height" value={10} />
            <FeedContent feedData={feedData} setUpdateFeed={setUpdateFeed} />
            <Spacer type="height" value={10} />
            {feedData?.comments.length > 0 && (
              <View
                style={{
                  backgroundColor: '#28292A',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{ fontSize: 16, color: '#f5f5f5', fontWeight: '700' }}
                >
                  댓글{' '}
                  <Text style={{ fontWeight: '500' }}>
                    {feedData.commentCount}
                  </Text>
                </Text>
                <Spacer type="height" value={10} />
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
});
