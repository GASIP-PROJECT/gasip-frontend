import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getTimeDifference } from '@utils/timeUtil';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { Feed } from 'types/searchTypes';

import icon_like from '@assets/icon_like.png';
import icon_view from '@assets/icon_view.png';
import icon_comments from '@assets/icon_comments.png';

// TODO - navigation 관련 버그 해결
export default function FeedSummary({ feedData }: { feedData: Feed }) {
  if (!feedData) return null;

  const navigation = useNavigation();

  const { content, likeCount, clickCount, regDate, postId, memberNickname } =
    feedData;

  const handleSummaryPress = () => {
    // TODO - 각 글 세부 내용으로 이동시키는 처리
    navigation.navigate('FeedDetailScreen', { postId: postId });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSummaryPress}>
      <SummaryHeader regDate={regDate} memberNickname={memberNickname} />
      <Spacer type="height" value={10} />
      <SummaryContent content={content} />
      <Spacer type="height" value={10} />
      <SummaryFooter clickCount={clickCount} likeCount={likeCount} />
      <Spacer type="height" value={10} />
      <View style={styles.bottomLine} />
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
      {timeString} | {memberNickname}
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
}: {
  clickCount: number;
  likeCount: number;
}) => {
  return (
    <View style={styles.footerContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={icon_like} style={{ width: 15, height: 15 }} />
        <Spacer type="width" value={5} />
        <Text style={{ fontSize: 15, color: 'red', fontWeight: '500' }}>
          {likeCount}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={icon_comments} style={{ width: 15, height: 15 }} />
        <Spacer type="width" value={5} />
        <Text style={{ fontSize: 15, color: '#4490d8', fontWeight: '500' }}>
          {3}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={icon_view} style={{ width: 15, height: 15 }} />
        <Spacer type="width" value={5} />
        <Text style={{ fontSize: 15, color: '#999999', fontWeight: '500' }}>
          {clickCount}
        </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
