import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

import HomeScreenHeader from './HomeScreenHeader';
import FeedsScreen from './FeedsScreen/FeedsScreen';

import Spacer from '@components/common/Spacer';
import SearchScreen from './SearchScreen/SearchScreen';

export default function HomeScreen() {
  const [isSearchPageOpen, setIsSearchPageOpen] = useState<boolean>(false);

  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <HomeScreenHeader />
        <Spacer type="height" value={20} />
        {isSearchPageOpen ? <SearchScreen /> : <FeedsScreen />}
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
