import React from 'react';
import { StyleSheet, View } from 'react-native';

import useCommentActionMenuBackdropStore from '@store/commentActionMenuBackdropStore';

import FeedComment from './FeedComment';
import FeedActionMenuBackdrop from './FeedActionMenuBackdrop';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import useCommentEditStore from '@store/commentEditStore';

// 어떤 걸 props로 넘겨서 처리해야하는지에 대한 기준이 필요하다.

interface FeedCommentsProps {
  comments: any[];
  handleReplyCommentPress: (commentId: number, commentNickname: string) => void;
  scrollTo: (y: number) => void;
  handleCommentReportPress: (content: string, authorNickname: string) => void;
}

// TODO - handleReplyComment는 액션-대상 순으로 네이밍되어있는데 handleCommentPress는 대상-액션 순으로 네이밍되어 있다.
// 그때그때 손가는대로 네이밍하기 보다는 규칙을 정해서 일관성있게 네이밍이 필요함.
export default function FeedComments({
  comments,
  handleReplyCommentPress,
  scrollTo,
  handleCommentReportPress,
}: FeedCommentsProps) {
  const { selectedCommentId } = useCommentEditStore();
  const { showCommentActionMenuBackdrop } = useCommentActionMenuBackdropStore();

  return (
    <View style={styles.container}>
      {/* TODO(리팩토링) - 여러 layer로 구현되어 있는 이유에 대해서 주석 필요 */}
      {showCommentActionMenuBackdrop && <FeedActionMenuBackdrop />}
      <Spacer type="height" value={8} />

      <GSText style={styles.commentTitleText}>
        댓글 {`(${comments.length}개)`}
      </GSText>
      <Spacer type="height" value={6} />

      {comments.map((comment, index) => (
        <FeedComment
          key={index.toString()}
          isLastElement={index === comments.length - 1}
          commentData={comment}
          handleReplyCommentPress={handleReplyCommentPress}
          isSelectedForEditing={
            // TODO - optional 로 처리하지 않으면 null로 뜨는 이슈 체크
            comment?.commentId === selectedCommentId
          }
          scrollTo={scrollTo}
          handleCommentReportPress={handleCommentReportPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BG_MAIN,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderColor: COLORS.BLUE_PRIMARY,
    zIndex: 4,
  },
  commentTitleText: {
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 16,
    lineHeight: 24,
  },
});
