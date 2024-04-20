import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';

import { NewFeedContext } from '@contexts/NewFeedContext';

import GSIcon from '@components/common/GSIcon';
import GSHeader from '@components/common/GSHeader';

import { COLORS } from '@styles/colors';

export default function CreateFeedModalHeader({
  feedContent,
}: {
  feedContent: string;
}) {
  const { setShowCreateFeedModal } = useContext(NewFeedContext);

  return (
    <GSHeader
      title="피드 작성"
      leftComponent={<GSIcon name="close-outline" />}
      onLeftComponentPress={() => setShowCreateFeedModal(false)}
      rightComponent={
        <Text style={styles.letterCountText}>
          {feedContent.length || 0}/500
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  letterCountText: {
    color: COLORS.WHITE,
    fontSize: 12,
  },
});
