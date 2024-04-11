import React from 'react';
import { StyleSheet, View } from 'react-native';

import FeedContent from './FeedContent';
import ProfessorInfo from './ProfessorInfo';
import FeedDetailScreenHeader from './FeedDetailScreenHeader';

import Spacer from '@components/common/Spacer';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

export default function FeedDetailScreen() {
  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <FeedDetailScreenHeader />
        <Spacer type="height" value={10} />
        <ProfessorInfo profName="홍길동" majorName="컴퓨터공학과" />
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
