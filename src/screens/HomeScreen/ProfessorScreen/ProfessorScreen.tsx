import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import ProfessorFeeds from './ProfessorFeeds';
import ProfessorDetail from './ProfessorDetail';

import Spacer from '@components/common/Spacer';
import GSIcon from '@components/common/GSIcon';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';
import ProfessorRateModal from './ProfessorRateModal';

export default function ProfessorDetailScreen({ route, navigation }) {
  const { professorData } = route.params;
  const { profId } = professorData;

  const [currentRating, setCurrentRating] = useState(3);

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const openRateModal = () => {
    actionSheetRef?.current?.show();
  };

  return (
    <SafeAreaLayout>
      <GSHeader
        title={'교수님 정보'}
        leftComponent={<GSIcon name="chevron-back-outline" />}
        onLeftComponentPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Spacer type="height" value={15} />
        <ProfessorDetail
          professorData={professorData}
          handlePresentModalPress={openRateModal}
        />
        <Spacer type="height" value={20} />
        <ProfessorFeeds profId={profId} />
      </View>
      <ProfessorRateModal
        actionSheetRef={actionSheetRef}
        currentRating={currentRating}
        setCurrentRating={setCurrentRating}
      />
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
