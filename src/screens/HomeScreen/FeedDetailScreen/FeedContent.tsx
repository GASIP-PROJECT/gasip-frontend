import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MMKVStorage } from '@api/mmkv';
import { likeFeed, likeFeedCancel } from '@api/index';
import { getTimeDifference } from '@utils/timeUtil';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { type Feed } from 'types/searchTypes';

export default function FeedContent({
  feedData,
  setUpdateFeed,
  openFeedActionsModal,
}: {
  feedData: Feed | null;
  setUpdateFeed: Dispatch<SetStateAction<boolean>>;
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
      <Spacer type="height" value={10} />
      <FeedContentFooter
        likeCount={likeCount}
        postId={postId}
        isLike={isLike}
        setUpdateFeed={setUpdateFeed}
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
      <Text style={styles.feedHeaderText}>
        <Text style={{ color: '#B4B4B3' }}>{memberNickname}</Text> |{' '}
        {timeString}
      </Text>

      {isCurrentUserCommentAuthor && (
        <TouchableOpacity onPress={openFeedActionsModal}>
          <GSIcon name="ellipsis-horizontal" color="#B4B4B3" size={20} />
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
  setUpdateFeed,
  isLike,
}: {
  likeCount: number;
  postId: number;
  setUpdateFeed: Dispatch<SetStateAction<boolean>>;
  isLike: boolean;
}) => {
  const iconTextGap = 3;

  const handleLikePress = async () => {
    if (isLike) {
      await likeFeedCancel(postId);
    } else {
      await likeFeed(postId);
    }

    setUpdateFeed(prev => !prev);
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={handleLikePress}
      >
        <GSIcon name="heart" size={20} color="tomato" />
        <Spacer type="width" value={iconTextGap} />
        <Text style={styles.iconText}>{likeCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#28292A',
  },
  feedHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedHeaderText: {
    color: '#4b5159',
    fontWeight: '500',
  },
  feedContentText: {
    color: COLORS.WHITE,
    fontSize: 20,
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
});
