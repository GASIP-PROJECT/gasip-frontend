import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { getTimeDifference } from '@utils/timeUtil';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { FeedComment } from 'types/searchTypes';

import icon_reply from '@assets/icon_reply.png';

export default function FeedCommentReply({ reply }: { reply: FeedComment }) {
  const { content, commentLike, regDate, memberName } = reply;

  return (
    <View style={styles.container}>
      <Image source={icon_reply} style={{ width: 15, height: 15 }} />
      <Spacer type="width" value={10} />
      <View>
        <Spacer type="height" value={5} />
        <ReplyHeader regDate={regDate} replierNickname={memberName} />
        <ReplyBody content={content} />
        <Spacer type="height" value={5} />
        <ReplyFooter likeCount={commentLike} />
      </View>
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
      {timeString} | {replierNickname}
    </Text>
  );
};

const ReplyBody = ({ content }: { content: string }) => {
  return <Text style={styles.commentBodyText}>{content}</Text>;
};

const ReplyFooter = ({ likeCount }: { likeCount: number | null }) => {
  return (
    <View style={styles.footerContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <GSIcon name="heart" size={15} color="red" />
        <Spacer type="width" value={5} />
        <Text style={{ fontSize: 15, color: 'red', fontWeight: '500' }}>
          {likeCount || 0}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    flexDirection: 'row',
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
  bottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.WHITE,
  },
});
