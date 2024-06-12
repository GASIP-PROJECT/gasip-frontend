import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MMKVStorage } from '@api/mmkv';
import { likeFeed, likeFeedCancel } from '@api/index';
import { getTimeDifference } from '@utils/timeUtil';

import useCommentEditStore from '@store/commentEditStore';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';

import { COLORS } from '@styles/colors';
import { type Feed } from 'types/searchTypes';

import icon_view from '@assets/icon_view.png';
import icon_comment from '@assets/icon_comment.png';
import icon_thumbsup from '@assets/icon_thumbsup.png';
import icon_dots_vertical from '@assets/icon_dots_vertical.png';

export default function FeedContent({
  feedData,
  openFeedActionsModal,
}: {
  feedData: Feed | null;
  openFeedActionsModal: () => void;
}) {
  if (feedData === null) return <View />;

  const {
    memberId,
    content,
    regDate,
    likeCount,
    postId,
    memberNickname,
    isLike,
    commentCount,
    clickCount,
  } = feedData;

  return (
    <View style={styles.container}>
      <FeedContentHeader
        regDate={regDate}
        memberNickname={memberNickname}
        memberId={memberId}
        openFeedActionsModal={openFeedActionsModal}
      />
      <Spacer type="height" value={10} />
      <FeedContentText content={content} />
      <Spacer type="height" value={28} />
      <FeedContentFooter
        likeCount={likeCount}
        postId={postId}
        isLike={isLike}
        clickCount={clickCount}
        commentCount={commentCount}
      />
    </View>
  );
}
const FeedContentHeader = ({
  regDate,
  memberNickname,
  memberId,
  openFeedActionsModal,
}: {
  regDate: string;
  memberNickname: string;
  memberId: number;
  openFeedActionsModal: () => void;
}) => {
  const timeString = getTimeDifference(regDate);
  const isCurrentUserCommentAuthor =
    memberId === MMKVStorage.getNumber('memberId');

  return (
    <View style={styles.feedHeaderContainer}>
      <View style={{ flexDirection: 'row' }}>
        <GSText style={styles.feedHeaderText}>{memberNickname}</GSText>
        <Spacer type="width" value={6} />
        <GSText style={styles.timeText}>{timeString}</GSText>
      </View>

      {isCurrentUserCommentAuthor && (
        <TouchableOpacity onPress={openFeedActionsModal}>
          <Image
            source={icon_dots_vertical}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const FeedContentText = ({ content }: { content: string }) => {
  return <Text style={styles.feedContentText}>{content}</Text>;
};

const FeedContentFooter = ({
  likeCount,
  postId,
  isLike,
  clickCount,
  commentCount,
}: {
  likeCount: number;
  postId: number;
  isLike: boolean;
  clickCount: number;
  commentCount: number;
}) => {
  const toggleUpdateFeed = useCommentEditStore(state => state.toggleUpdateFeed);
  const iconTextGap = 3;

  const handleLikePress = async () => {
    if (isLike) {
      await likeFeedCancel(postId);
    } else {
      await likeFeed(postId);
    }

    toggleUpdateFeed();
  };

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
            tintColor: isLike ? COLORS.BLUE_PRIMARY : COLORS.GRAY_400,
          }}
        />
        <Spacer type="width" value={iconTextGap} />
        <GSText style={styles.iconText}>{likeCount}</GSText>
      </TouchableOpacity>
      <Spacer type="width" value={15} />

      <Image source={icon_comment} style={{ width: 20, height: 20 }} />
      <Spacer type="width" value={iconTextGap} />
      <GSText style={styles.iconText}>{commentCount}</GSText>

      <Spacer type="width" value={15} />

      <Image source={icon_view} style={{ width: 20, height: 20 }} />
      <Spacer type="width" value={iconTextGap} />
      <GSText style={styles.iconText}>{clickCount}</GSText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  feedHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedHeaderText: {
    fontSize: 14,
    fontWeight: '600',
  },
  feedContentText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.GRAY_500,
  },
});
