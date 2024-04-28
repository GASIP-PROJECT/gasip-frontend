import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';

import { rateProfessor } from '@api/index';

import ProfessorFeeds from './ProfessorFeeds';
import ProfessorDetail from './ProfessorDetail';
import ProfessorRateModal from './ProfessorRateModal';

import Spacer from '@components/common/Spacer';
import GSIcon from '@components/common/GSIcon';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

export default function ProfessorDetailScreen({ route, navigation }) {
  const { professorData } = route.params;
  const { profId } = professorData;
  const [currentRating, setCurrentRating] = useState(3);

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const openRateModal = () => {
    actionSheetRef?.current?.show();
  };

  const rate = async () => {
    await rateProfessor(profId, currentRating);
    actionSheetRef?.current?.hide();
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
        rate={rate}
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
