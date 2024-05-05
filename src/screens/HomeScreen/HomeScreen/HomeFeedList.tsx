import React from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import GSIcon from '@components/common/GSIcon';

import { COLORS } from '@styles/colors';
import icon_comment from '@assets/icon_comment.png';
import icon_thumbsup from '@assets/icon_thumbsup.png';

interface HomeFeedListProps {
  headerIcon: ImageSourcePropType;
  title: string;
}

export default function HomeFeedList({ headerIcon, title }: HomeFeedListProps) {
  return (
    <View>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Image source={headerIcon} style={styles.headerIcon} />
          <Spacer type="width" value={2} />
          <GSText style={styles.titleText}>{title}</GSText>
        </View>

        <TouchableOpacity style={styles.seeMoreButtonContainer}>
          <GSText style={styles.seeMoreText}>더보기</GSText>
          <GSIcon
            name="chevron-forward-outline"
            size={12}
            color={COLORS.GRAY_500}
          />
        </TouchableOpacity>
      </View>

      <Spacer type="height" value={10} />

      {/* 피드 목록 */}
      <View style={styles.feedsContainer}>
        <FeedListItem
          content="피드 내용이 이런데 길어지면 어떻게 되고 그런건 아무도 모르지만 아무튼 머시지..."
          likeCount={10}
          commentCount={5}
        />
        <Spacer type="height" value={10} />
        <FeedListItem content="피드 내용" likeCount={10} commentCount={5} />
        <Spacer type="height" value={10} />
        <FeedListItem content="피드 내용" likeCount={10} commentCount={5} />
        <Spacer type="height" value={10} />
        <FeedListItem content="피드 내용" likeCount={10} commentCount={5} />
      </View>
    </View>
  );
}

const FeedListItem = ({
  content,
  likeCount,
  commentCount,
}: {
  content: string;
  likeCount: number;
  commentCount: number;
}) => {
  return (
    <View style={styles.feedItemContainer}>
      {/* 피드 내용 */}
      <View style={{ flex: 1 }}>
        <GSText numberOfLines={1} style={styles.feedContentText}>
          {content}
        </GSText>
      </View>
      <Spacer type="width" value={10} />

      {/* 좋아요, 댓글 수 */}
      <View style={styles.feedIconsContainer}>
        <View style={{ width: 44, flexDirection: 'row' }}>
          <Image source={icon_thumbsup} style={styles.feedIcon} />
          <Spacer type="width" value={4} />
          <GSText style={styles.feedIconText}>{likeCount}</GSText>
        </View>
        <View style={{ width: 44, flexDirection: 'row' }}>
          <Image source={icon_comment} style={styles.feedIcon} />
          <Spacer type="width" value={4} />
          <GSText style={styles.feedIconText}>{commentCount}</GSText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
  },

  feedsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 17,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 0.5,
  },
  feedItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedContentText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.GRAY_600,
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
  seeMoreButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeMoreText: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.GRAY_500,
  },
});
