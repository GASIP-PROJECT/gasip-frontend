import React from 'react';
import { StyleSheet, View } from 'react-native';

import FeedContent from './FeedContent';
import ProfessorInfo from './ProfessorInfo';
import FeedComment from './FeedComment';
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
        <Spacer type="height" value={10} />
        <FeedContent feedData={null} />
        <Spacer type="height" value={10} />

        <View
          style={{
            backgroundColor: '#28292A',
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}
        >
          <FeedComment />
        </View>
      </View>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
