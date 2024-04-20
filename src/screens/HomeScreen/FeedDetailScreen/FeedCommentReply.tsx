import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getTimeDifference } from '@utils/timeUtil';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { FeedComment } from 'types/searchTypes';

export default function FeedCommentReply({ reply }: { reply: FeedComment }) {
  const { content, commentLike, regDate, memberName } = reply;

  return (
    <View style={styles.container}>
      <Spacer type="height" value={5} />
      <ReplyHeader regDate={regDate} replierNickname={memberName} />
      <Spacer type="height" value={5} />
      <ReplyBody content={content} />
      <Spacer type="height" value={5} />
      <ReplyFooter likeCount={commentLike} />
    </View>
  );
}

const ReplyHeader = ({
  regDate,
  replierNickname,
}: {
  regDate: string;
  replierNickname: string;
}) => {
  const timeString = getTimeDifference(regDate);

  return (
    <Text style={styles.commentHeaderText}>
      <Text style={{ color: '#B4B4B3' }}>{replierNickname}</Text> | {timeString}
    </Text>
  );
};

const ReplyBody = ({ content }: { content: string }) => {
  return <Text style={styles.commentBodyText}>{content}</Text>;
};

const ReplyFooter = ({ likeCount }: { likeCount: number | null }) => {
  const iconTextGap = 3;

  return (
    <View style={styles.footerContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <GSIcon name="heart" size={20} color="tomato" />
        <Spacer type="width" value={iconTextGap} />
        <Text style={styles.iconText}>{likeCount || 0}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    paddingLeft: 10,
    borderColor: '#B4B4B3',
    borderLeftWidth: 2,
  },
  commentHeaderText: {
    fontSize: 14,
    color: '#4b5159',
    fontWeight: '500',
  },
  commentBodyText: {
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
