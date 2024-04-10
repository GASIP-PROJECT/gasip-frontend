import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

import HomeScreenHeader from './HomeScreenHeader';
import HomeScreenTabBar from './HomeScreenTabBar';

import FeedTab from './FeedTab/FeedTab';
import PopularTab from './PopularTab/PopularTab';

import Spacer from '@components/common/Spacer';

import { HOME_TABS } from '../../constants'; // TODO - 절대 경로 시 참조는 되는데 typescript 에러 발생 수정

export default function HomeScreen() {
  const [currentTab, setCurrentTab] = useState<string>(HOME_TABS.FEED);

  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <HomeScreenHeader />
        <Spacer type="height" value={20} />
        <HomeScreenTabBar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <Spacer type="height" value={20} />
        {currentTab === HOME_TABS.FEED && <FeedTab />}
        {currentTab === HOME_TABS.POPULAR && <PopularTab />}
      </View>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
