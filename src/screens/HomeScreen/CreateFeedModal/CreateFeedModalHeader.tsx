import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import useNewFeedStore from '@store/newFeedStore';

import GSIcon from '@components/common/GSIcon';
import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';

export default function CreateFeedModalHeader({
  feedContent,
  handleCreateFeedPress,
}: {
  feedContent: string;
  handleCreateFeedPress: () => void;
}) {
  const closeNewFeedModal = useNewFeedStore(state => state.closeNewFeedModal);

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}
    >
      <Spacer type="height" value={10} />
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            onPress={closeNewFeedModal}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <GSIcon
              name="close-outline"
              color={COLORS.BLUE_PRIMARY}
              size={30}
            />
          </TouchableOpacity>
          <View />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>리뷰 작성</Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <View />

          <TouchableOpacity
            onPress={handleCreateFeedPress}
            style={styles.createFeedButton}
          >
            <GSText style={styles.createFeedButtonText}>완료</GSText>
          </TouchableOpacity>
        </View>
      </View>
      <Spacer type="height" value={22} />

      {/* TODO - border 관련 style수정 필요 */}
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: COLORS.BLUE_PRIMARY,
          }}
        ></View>
      </View>

      <Spacer type="height" value={8} />

      <GSText style={styles.letterCountText}>{feedContent.length}/500</GSText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  letterCountText: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.GRAY_400,
    alignSelf: 'flex-end',
  },
  createFeedButton: {
    backgroundColor: COLORS.BLUE_PRIMARY,
    height: 28,
    paddingHorizontal: 16,
    borderRadius: 100,
    justifyContent: 'center',
  },
  createFeedButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
});
