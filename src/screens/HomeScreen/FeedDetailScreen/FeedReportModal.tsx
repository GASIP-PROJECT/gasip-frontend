import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, Modal, View, TextInput, Alert } from 'react-native';

import FeedActionModalHeader from './FeedActionModalHeader';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import { COLORS } from '@styles/colors';

interface FeedEditModalProps {
  isVisible: boolean;
  reportData: {
    content: string;
    authorNickname: string;
    type: '게시글' | '댓글';
  };
  closeModal: () => void;
}

export default function FeedReportModal({
  reportData,
  isVisible,
  closeModal,
}: FeedEditModalProps) {
  const [reasonForReporting, setReasonForReporting] = useState('');

  // TODO - 신고 시 백엔드 구현 후 API 붙여서 기능 구현 필요
  const handleReportCompletePress = () => {};

  const handleCloseModalPress = () => {
    closeModal();
    setReasonForReporting('');
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <SafeAreaLayout>
        <FeedActionModalHeader
          title="신고하기"
          handleActionButtonPress={() => {
            if (!reasonForReporting) {
              Alert.alert('신고 사유를 작성해주세요.', '', [
                {
                  text: '확인',
                  onPress: () => {},
                },
              ]);
              return;
            }

            Alert.alert(
              '신고가 접수되었습니다. 검토까지는 최대 24시간이 소요됩니다.',
              '',
              [
                {
                  text: '확인',
                  onPress: handleCloseModalPress,
                },
              ],
            );
          }}
          closeModal={handleCloseModalPress}
        />

        <View style={styles.container}>
          <Spacer type="height" value={16} />

          <GSText style={styles.subTitle}>신고 {reportData.type}</GSText>
          <Spacer type="height" value={8} />
          <ReportedContent
            content={reportData.content}
            authorNickname={reportData.authorNickname}
          />

          <Spacer type="height" value={12} />
          <View style={styles.divider} />
          <Spacer type="height" value={12} />

          <GSText style={styles.subTitle}>신고 이유</GSText>
          <Spacer type="height" value={8} />
          <ReportReasonInput
            reasonForReporting={reasonForReporting}
            setReasonForReporting={setReasonForReporting}
          />
          <View style={styles.divider} />

          <Spacer type="height" value={32} />
          <ReportInformation />
        </View>
      </SafeAreaLayout>
    </Modal>
  );
}

const ReportedContent = ({
  content,
  authorNickname,
}: {
  content: string;
  authorNickname: string;
}) => {
  return (
    <View style={styles.contentContainer}>
      <GSText style={styles.authorNickname}>{authorNickname}</GSText>
      <Spacer type="height" value={12} />
      <GSText style={styles.content}>{content}</GSText>
    </View>
  );
};

const ReportReasonInput = ({
  reasonForReporting,
  setReasonForReporting,
}: {
  reasonForReporting: string;
  setReasonForReporting: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <TextInput
      placeholder="신고 사유를 작성해주세요."
      style={{ height: 100, width: '100%', fontSize: 14, color: '#111111' }}
      onChangeText={text => setReasonForReporting(text)}
      value={reasonForReporting}
      multiline
    />
  );
};

const ReportInformation = () => {
  return (
    <View style={styles.reportInformationContainer}>
      <GSText style={styles.reportInformationText}>
        누적 신고 횟수가 5회 이상인 유저는 글 작성이 제한됩니다.
      </GSText>
      <Spacer type="height" value={3} />
      <GSText style={styles.reportInformationText}>
        청렴한 커뮤니티 문화를 위한 여러분의 소중한 의견 감사합니다.
      </GSText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.GRAY_500,
    alignSelf: 'flex-start',
  },
  contentContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: COLORS.GRAY_100,
    borderRadius: 8,
  },
  authorNickname: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  content: {
    fontSize: 14,
    fontWeight: '400',
    color: '#111111',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E5E9EE',
  },
  reportInformationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportInformationText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.GRAY_400,
  },
});
