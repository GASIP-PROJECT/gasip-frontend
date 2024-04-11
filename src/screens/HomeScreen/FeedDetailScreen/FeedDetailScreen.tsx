import React from 'react';
import { StyleSheet, View } from 'react-native';

import FeedContent from './FeedContent';
import FeedDetailScreenHeader from './FeedDetailScreenHeader';

import SafeAreaLayout from '@components/common/SafeAreaLayout';

export default function FeedDetailScreen() {
  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <FeedDetailScreenHeader />
        <FeedContent feedData={null} />
      </View>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
