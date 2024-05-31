import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getTimeDifference } from '@utils/timeUtil';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { Feed } from 'types/searchTypes';
import icon_view from '@assets/icon_view.png';
import icon_comment from '@assets/icon_comment.png';
import icon_thumbsup from '@assets/icon_thumbsup.png';

// TODO - navigation 관련 버그 해결
export default function FeedSummary({
  feedData,
  showProfNameTag = true,
}: {
  feedData: Feed;
  showProfNameTag?: boolean;
}) {
  if (!feedData) return null;

  const navigation = useNavigation();

  const {
    content,
    likeCount,
    regDate,
    postId,
    memberNickname,
    commentCount,
    clickCount,
    profName,
  } = feedData;

  const goToFeed = () => {
    navigation.navigate('FeedDetailScreen', { postId: postId });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToFeed}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <SummaryContent content={content} />
        <Spacer type="width" value={10} />
        {showProfNameTag && <ProfessorNameTag profName={profName} />}
      </View>
      <Spacer type="height" value={10} />
      <SummaryFooter
        likeCount={likeCount}
        commentCount={commentCount || 0}
        clickCount={clickCount}
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
  clickCount,
  regDate,
  memberNickname,
}: {
  likeCount: number;
  commentCount: number | null;
  clickCount: number;
  regDate: string;
  memberNickname: string;
}) => {
  const timeString = getTimeDifference(regDate);

  return (
    <View style={styles.footerContainer}>
      <GSText style={styles.timeText}>{timeString}</GSText>

      <Spacer type="width" value={10} />

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
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

          <Spacer type="width" value={10} />

          <GSText style={styles.nicknameText}>{memberNickname}</GSText>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icon_view} style={styles.feedIcon} />
          <Spacer type="width" value={4} />
          <GSText style={styles.feedIconText}>{clickCount}</GSText>
        </View>
      </View>
    </View>
  );
};

const ProfessorNameTag = ({ profName }: { profName: string }) => {
  return (
    <View style={styles.professorNameTagContainer}>
      <GSText style={{ color: COLORS.GRAY_500, fontSize: 12 }}>
        {profName} 교수님
      </GSText>
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
    flex: 1,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.GRAY_500,
  },
  feedIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  professorNameTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 24,
    borderWidth: 1,
    borderColor: COLORS.GRAY_500,
  },
});
