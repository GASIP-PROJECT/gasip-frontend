import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { getFeedData } from '@api/index';
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
  isLastElement,
}: {
  feedData: Feed;
  showProfNameTag?: boolean;
  isLastElement: boolean;
}) {
  if (!feedData) return null;

  const navigation = useNavigation();

  const { content, postId, memberNickname, profName } = feedData;

  const goToFeed = () => {
    // 같은 이름의 화면이 stack의 직전 화면인 상태에서 navigate함수로 이동 시도 시, 다음 화면으로 이동하는 것이 아니라 이전화면으로 이동함.
    // 그래서 push를 통해서 강제로 새 화면이 Stack에 추가되도록 구현
    navigation.push('FeedDetailScreen', { postId: postId });
  };

  return (
    <>
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
        <SummaryFooter memberNickname={memberNickname} postId={postId} />
      </TouchableOpacity>
      {/* FeedSummary가 사용되는 FlatList에서 listFooterComponent가 존재하는 경우 최초 렌더링 시 onEndReached가 바로 호출되는 이슈가 있어 대신 마지막 요소인 경우 Spacer를 렌더링하는 방식으로 임시 수정 */}
      {isLastElement && <Spacer type="height" value={150} />}
    </>
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
  memberNickname,
  postId,
}: {
  memberNickname: string;
  postId: number;
}) => {
  // 필요 시 값을 업데이트 하기 위해서 useState값으로 설정
  const [postRegisterTime, setPostRegisterTime] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const data = await getFeedData(postId);

        if (data) {
          setPostRegisterTime(getTimeDifference(data.regDate));
          setLikeCount(data.likeCount || 0);
          setCommentCount(data.commentCount || 0);
          setClickCount(data.clickCount || 0);
        }
      };

      getData();
    }, []),
  );

  return (
    <View style={styles.footerContainer}>
      <GSText style={styles.timeText}>{postRegisterTime}</GSText>

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
    elevation: 1,
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
