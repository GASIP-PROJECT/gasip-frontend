import React, { Dispatch, SetStateAction } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';
import { HOME_TABS } from '../../../constants';

import icon_pin from '@assets/icon_pin.png';
import icon_fire from '@assets/icon_fire.png';

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
        icon={icon_pin}
        title={HOME_TABS.ALL}
        currentTab={currentTab}
        onPress={handleFeedTabPress}
      />

      <Spacer type="width" value={12} />

      <TabIndicator
        icon={icon_fire}
        title={HOME_TABS.GENERAL}
        currentTab={currentTab}
        onPress={handleGeneralTabPress}
      />

      <Spacer type="width" value={12} />

      <TabIndicator
        icon={icon_fire}
        title={HOME_TABS.POPULAR}
        currentTab={currentTab}
        onPress={handlePopularTabPress}
      />
    </View>
  );
}

// TODO - pin 아이콘 사이즈 재조정 필요
const TabIndicator = ({
  icon,
  title,
  currentTab,
  onPress,
}: {
  icon: ImageSourcePropType;
  title: string;
  currentTab: string;
  onPress: () => void;
}) => {
  const bgColor = currentTab === title ? `#4490d8` : `#999999`;
  return (
    <TouchableOpacity
      style={[styles.indicatorContainer, { backgroundColor: bgColor }]}
      disabled={title === currentTab}
      onPress={onPress}
    >
      <Image source={icon} style={{ width: 18, height: 18 }} />
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
