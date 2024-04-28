import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';

interface FeedActionsModalProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
  // currentRating: number;
  // setCurrentRating: React.Dispatch<React.SetStateAction<number>>;
  // rate: () => void;
}

export default function FeedActionsModal({
  actionSheetRef,
}: FeedActionsModalProps) {
  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={styles.actionSheetContainer}
    >
      <Action title="수정" onPress={() => {}} />
      <Action title="삭제" onPress={() => {}} destructive={true} />
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
