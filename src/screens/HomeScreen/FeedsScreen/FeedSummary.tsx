import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getTimeDifference } from '@utils/timeUtil';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { Feed } from 'types/searchTypes';
import icon_comment from '@assets/icon_comment.png';
import icon_thumbsup from '@assets/icon_thumbsup.png';

// TODO - navigation 관련 버그 해결
export default function FeedSummary({ feedData }: { feedData: Feed }) {
  if (!feedData) return null;

  const navigation = useNavigation();

  const { content, likeCount, regDate, postId, memberNickname, commentCount } =
    feedData;

  const goToFeed = () => {
    navigation.navigate('FeedDetailScreen', { postId: postId });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToFeed}>
      <SummaryContent content={content} />
      <Spacer type="height" value={10} />
      <SummaryFooter
        likeCount={likeCount}
        commentCount={commentCount || 0}
        regDate={regDate}
        memberNickname={memberNickname}
      />
    </TouchableOpacity>
  );
}

const SummaryContent = ({ content }: { content: string }) => {
  return (
    <GSText style={styles.feedContentText} numberOfLines={2}>
      {content}
    </GSText>
  );
};

const SummaryFooter = ({
  likeCount,
  commentCount,
  regDate,
  memberNickname,
}: {
  likeCount: number;
  commentCount: number | null;
  regDate: string;
  memberNickname: string;
}) => {
  const iconTextGap = 3;
  const timeString = getTimeDifference(regDate);

  return (
    <View style={styles.footerContainer}>
      <GSText style={styles.timeText}>{timeString}</GSText>

      <Spacer type="width" value={10} />

      <View style={styles.feedIconsContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icon_thumbsup} style={styles.feedIcon} />
          <Spacer type="width" value={4} />
          <GSText style={styles.feedIconText}>{likeCount}</GSText>
        </View>
        <Spacer type="width" value={10} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icon_comment} style={styles.feedIcon} />
          <Spacer type="width" value={4} />
          <GSText style={styles.feedIconText}>{commentCount}</GSText>
        </View>
      </View>

      <Spacer type="width" value={10} />

      <GSText style={styles.nicknameText}>{memberNickname}</GSText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLUE_PRIMARY,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedContentText: {
    fontSize: 14,
    fontWeight: '500',
  },
  timeText: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.GRAY_500,
  },
  feedIconsContainer: {
    flexDirection: 'row',
  },
  feedIcon: {
    width: 18,
    height: 18,
  },
  feedIconText: {
    fontSize: 12,
    fontWeight: '500',
  },

  nicknameText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.GRAY_500,
  },
});
