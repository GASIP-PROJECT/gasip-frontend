import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SafeAreaLayout from '@components/common/SafeAreaLayout';
import FeedDetailScreenHeader from './FeedDetailScreenHeader';

export default function FeedDetailScreen() {
  return (
    <SafeAreaLayout>
      <FeedDetailScreenHeader />
    </SafeAreaLayout>
  );
}

const Header = () => {
  return (
    <View>
      <Text>Header</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
