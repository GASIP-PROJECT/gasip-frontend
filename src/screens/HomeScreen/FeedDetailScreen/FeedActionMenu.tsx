import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import GSText from '@components/common/GSText';

import { COLORS } from '@styles/colors';

interface FeedActionMenuProps {
  handleFeedEditPress: () => void;
  handleFeedDeletePress: () => void;
  handleReportPress: () => void;
  isCurrentUserFeedAuthor: boolean;
}

export default function FeedActionMenu({
  handleFeedEditPress,
  handleFeedDeletePress,
  handleReportPress,
  isCurrentUserFeedAuthor,
}: FeedActionMenuProps) {
  if (isCurrentUserFeedAuthor) {
    return (
      <MenusForAuthor
        handleFeedEditPress={handleFeedEditPress}
        handleFeedDeletePress={handleFeedDeletePress}
      />
    );
  }

  return <MenusForReader handleReportPress={handleReportPress} />;
}

const styles = StyleSheet.create({
  actionMenuContainer: {
    position: 'absolute',
    top: 0,
    right: 35,
    width: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLUE_PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 1002,
    borderWidth: 1,
    borderColor: COLORS.BLUE_LIGHT_200,
  },
  actionMenuItemContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  actionMenuText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.BLUE_LIGHT_100,
  },
});

// 글 작성자인 경우 수정/삭제 옵션 표시
const MenusForAuthor = ({
  handleFeedEditPress,
  handleFeedDeletePress,
}: {
  handleFeedEditPress: () => void;
  handleFeedDeletePress: () => void;
}) => {
  return (
    <View style={[styles.actionMenuContainer, { height: 72 }]}>
      {/* 수정하기 버튼 */}
      <ActionMenuItem onPress={handleFeedEditPress} itemText="수정하기" />

      {/* 구분선 */}
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.BLUE_LIGHT_200,
          width: '100%',
        }}
      />

      {/* 삭제하기 버튼 */}
      <ActionMenuItem onPress={handleFeedDeletePress} itemText="삭제하기" />
    </View>
  );
};

// 글 작성자가 아닌 경우 쪽지하기(추가예정), 신고하기 옵션 표시
const MenusForReader = ({
  handleReportPress,
}: {
  handleReportPress: () => void;
}) => {
  return (
    <View style={[styles.actionMenuContainer, { height: 36 }]}>
      <ActionMenuItem onPress={handleReportPress} itemText="신고하기" />
    </View>
  );
};

const ActionMenuItem = ({
  onPress,
  itemText,
}: {
  onPress: () => void;
  itemText: string;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionMenuItemContainer}>
      <GSText style={styles.actionMenuText}>{itemText}</GSText>
    </TouchableOpacity>
  );
};
