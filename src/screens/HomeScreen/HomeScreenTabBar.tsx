import React from 'react';
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

import icon_pin from '@assets/icon_pin.png';
import icon_fire from '@assets/icon_fire.png';

export default function HomeScreenTabBar() {
  return (
    <View style={styles.container}>
      <TabIndicator icon={icon_pin} title="전체 피드" currentTab="전체 피드" />
      <Spacer type="width" value={12} />
      <TabIndicator icon={icon_fire} title="인기글" currentTab="feed" />
    </View>
  );
}

// TODO - pin 아이콘 사이즈 재조정 필요
const TabIndicator = ({
  icon,
  title,
  currentTab,
}: {
  icon: ImageSourcePropType;
  title: string;
  currentTab: string;
}) => {
  const bgColor = currentTab === title ? `#4490d8` : `#999999`;
  return (
    <TouchableOpacity
      style={[styles.indicatorContainer, { backgroundColor: bgColor }]}
      disabled={title === currentTab}
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
    height: 25,
    paddingHorizontal: 13,
    backgroundColor: '#999999',
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
