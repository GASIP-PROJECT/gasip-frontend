import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { getTimeDifference } from '@utils/timeUtil';

import GSIcon from '@components/common/GSIcon';
import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { FeedComment } from 'types/searchTypes';

import icon_reply from '@assets/icon_reply.png';
import icon_thumbsup from '@assets/icon_thumbsup.png';

export default function FeedCommentReply({ reply }: { reply: FeedComment }) {
  const { content, commentLike, regDate, memberName } = reply;

  return (
    <View style={styles.container}>
      <Spacer type="height" value={5} />
      <ReplyHeader regDate={regDate} replierNickname={memberName} />
      <Spacer type="height" value={6} />
      <View style={{ paddingHorizontal: 20 }}>
        <ReplyBody content={content} />
        <Spacer type="height" value={16} />
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
    <View style={styles.headerContainer}>
      <Image source={icon_reply} style={{ width: 14, height: 14 }} />
      <Spacer type="width" value={6} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <GSText style={styles.replyHeaderText}>{replierNickname}</GSText>
        <Spacer type="width" value={6} />
        <GSText style={styles.timeStringText}>{timeString}</GSText>
      </View>
    </View>
  );
};

const ReplyBody = ({ content }: { content: string }) => {
  return <GSText style={styles.replyBodyText}>{content}</GSText>;
};

const ReplyFooter = ({ likeCount }: { likeCount: number | null }) => {
  const iconTextGap = 3;

  return (
    <View style={styles.footerContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={icon_thumbsup} style={{ width: 20, height: 20 }} />
        <Spacer type="width" value={iconTextGap} />
        <Text style={styles.iconText}>{likeCount || 0}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: COLORS.GRAY_100,
    borderBottomWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  replyHeaderText: {
    fontSize: 12,
    fontWeight: '600',
  },
  replyBodyText: {
    fontSize: 14,
    fontWeight: '400',
  },
  footerContainer: {
    flexDirection: 'row',
  },
  iconText: {
    fontSize: 12,
    fontWeight: '500',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  timeStringText: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.GRAY_500,
  },
});
