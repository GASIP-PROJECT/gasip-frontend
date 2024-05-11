import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';

interface FeedActionsModalProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
  handleFeedDeletePress: () => void;
  handleFeedEditPress: () => void;
  paddingBottom?: number;
}

export default function FeedActionsModal({
  actionSheetRef,
  handleFeedDeletePress,
  handleFeedEditPress,
  paddingBottom = 0,
}: FeedActionsModalProps) {
  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={styles.actionSheetContainer}
    >
      <Action title="수정" onPress={handleFeedEditPress} />
      <Action title="삭제" onPress={handleFeedDeletePress} destructive={true} />
      <Spacer type="height" value={paddingBottom} />
    </ActionSheet>
  );
}

const Action = ({
  title,
  onPress,
  destructive,
}: {
  title: string;
  onPress: () => void;
  destructive?: boolean;
}) => {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Text
        style={[
          styles.actionTitleText,
          { color: destructive ? 'red' : COLORS.WHITE },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionSheetContainer: {
    backgroundColor: '#28292A',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  actionButton: {
    padding: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#a9a9a9',
  },
  actionTitleText: {
    fontSize: 20,
    fontWeight: '500',
  },
});
