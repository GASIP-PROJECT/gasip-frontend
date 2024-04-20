import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import ProfessorFeeds from './ProfessorFeeds';
import ProfessorDetail from './ProfessorDetail';

import Spacer from '@components/common/Spacer';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import gasip_logo from '@assets/gasip_logo.png';

export default function ProfessorDetailScreen({ route }) {
  const { professorData } = route.params;

  const { profId } = professorData;

  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <ProfessorScreenHeader />
        <Spacer type="height" value={20} />
        <ProfessorDetail professorData={professorData} />
        <Spacer type="height" value={20} />
        <ProfessorFeeds profId={profId} />
      </View>
    </SafeAreaLayout>
  );
}

const ProfessorScreenHeader = () => {
  return <Image source={gasip_logo} style={{ width: 120, height: 50 }} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
