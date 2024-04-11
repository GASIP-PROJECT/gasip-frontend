import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';

import icon_like from '@assets/icon_like.png';
import icon_comments from '@assets/icon_comments.png';
import icon_view from '@assets/icon_view.png';

interface FeedSummaryProps {
  content: string;
  likeCount: number;
  clickCount: number;
  regDate: string;
  postId: number;
}

// TODO - navigation 관련 버그 해결
export default function FeedSummary({
  content,
  likeCount,
  clickCount,
  regDate,
  postId,
}: FeedSummaryProps) {
  const navigation = useNavigation();

  const handleSummaryPress = () => {
    // TODO - 각 글 세부 내용으로 이동시키는 처리
    navigation.navigate('FeedDetail', { postId: postId });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSummaryPress}>
      <SummaryHeader regDate={regDate} userNickName="userNickName" />
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
  userNickName,
}: {
  regDate: string;
  userNickName: string;
}) => {
  // TODO - 함수 구현
  const getFeedCreatedTimeString = () => {
    return regDate;
  };

  return (
    <Text style={styles.feedHeaderText}>
      {getFeedCreatedTimeString()} | {userNickName}
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
