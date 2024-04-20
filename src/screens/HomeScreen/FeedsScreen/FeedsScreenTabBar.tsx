import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { HOME_TABS } from '../../../constants';

interface FeedsScreenTabBar {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}

export default function FeedsScreenTabBar({
  currentTab,
  setCurrentTab,
}: FeedsScreenTabBar) {
  const handleFeedTabPress = () => {
    setCurrentTab(HOME_TABS.ALL);
  };

  const handleGeneralTabPress = () => {
    setCurrentTab(HOME_TABS.GENERAL);
  };

  const handlePopularTabPress = () => {
    setCurrentTab(HOME_TABS.POPULAR);
  };

  return (
    <View style={styles.container}>
      <TabIndicator
        iconName="list"
        title={HOME_TABS.ALL}
        currentTab={currentTab}
        onPress={handleFeedTabPress}
      />

      <Spacer type="width" value={12} />

      <TabIndicator
        iconName="megaphone"
        title={HOME_TABS.GENERAL}
        currentTab={currentTab}
        onPress={handleGeneralTabPress}
      />

      <Spacer type="width" value={12} />

      <TabIndicator
        iconName="flame"
        title={HOME_TABS.POPULAR}
        currentTab={currentTab}
        onPress={handlePopularTabPress}
      />
    </View>
  );
}

const TabIndicator = ({
  iconName,
  title,
  currentTab,
  onPress,
}: {
  iconName: string;
  title: string;
  currentTab: string;
  onPress: () => void;
}) => {
  const bgColor = currentTab === title ? `#4490d8` : `#999999`;
  const iconColor = currentTab === title ? 'tomato' : COLORS.WHITE;

  return (
    <TouchableOpacity
      style={[styles.indicatorContainer, { backgroundColor: bgColor }]}
      disabled={title === currentTab}
      onPress={onPress}
    >
      <GSIcon name={iconName} size={20} color={iconColor} />
      <Spacer type="width" value={3} />
      <Text style={styles.indicatorTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  indicatorContainer: {
    flexDirection: 'row',
    height: 30,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  indicatorTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
});
