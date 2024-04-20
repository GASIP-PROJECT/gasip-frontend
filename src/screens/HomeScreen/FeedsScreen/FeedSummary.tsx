import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getTimeDifference } from '@utils/timeUtil';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { Feed } from 'types/searchTypes';

// TODO - navigation 관련 버그 해결
export default function FeedSummary({ feedData }: { feedData: Feed }) {
  if (!feedData) return null;

  const navigation = useNavigation();

  const {
    content,
    likeCount,
    clickCount,
    regDate,
    postId,
    memberNickname,
    commentCount,
  } = feedData;

  const goToFeed = () => {
    navigation.navigate('FeedDetailScreen', { postId: postId });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToFeed}>
      <SummaryHeader regDate={regDate} memberNickname={memberNickname} />
      <Spacer type="height" value={10} />
      <SummaryContent content={content} />
      <Spacer type="height" value={10} />
      <SummaryFooter
        clickCount={clickCount}
        likeCount={likeCount}
        commentCount={commentCount || 0}
      />
    </TouchableOpacity>
  );
}

const SummaryHeader = ({
  regDate,
  memberNickname,
}: {
  regDate: string;
  memberNickname: string;
}) => {
  const timeString = getTimeDifference(regDate);

  return (
    <Text style={styles.feedHeaderText}>
      <Text style={{ color: '#B4B4B3' }}> {memberNickname}</Text> | {timeString}
    </Text>
  );
};

const SummaryContent = ({ content }: { content: string }) => {
  return (
    <Text style={styles.feedContentText} numberOfLines={2}>
      {content}
    </Text>
  );
};

const SummaryFooter = ({
  clickCount,
  likeCount,
  commentCount,
}: {
  clickCount: number;
  likeCount: number;
  commentCount: number | null;
}) => {
  const iconTextGap = 3;

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerIconContainer}>
        <GSIcon name="heart" size={20} color="tomato" />
        <Spacer type="width" value={iconTextGap} />
        <Text style={styles.iconText}>{likeCount}</Text>
      </View>

      <View style={[styles.footerIconContainer, { justifyContent: 'center' }]}>
        <GSIcon name="chatbox" size={20} color="#4F709C" />
        <Spacer type="width" value={iconTextGap} />
        <Text style={styles.iconText}>{commentCount}</Text>
      </View>

      <View
        style={[styles.footerIconContainer, { justifyContent: 'flex-end' }]}
      >
        <GSIcon name="eye" size={20} color="#999999" />
        <Spacer type="width" value={iconTextGap} />
        <Text style={styles.iconText}>{clickCount}</Text>
      </View>
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
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerIconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.WHITE,
  },
  feedHeaderText: {
    color: '#4b5159',
    fontWeight: '500',
  },
  feedContentText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
  iconText: {
    fontSize: 15,
    color: '#B6BBC4',
    fontWeight: '500',
  },
});
