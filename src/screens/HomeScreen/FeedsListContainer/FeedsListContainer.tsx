import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useNewFeedStore from '@store/newFeedStore';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import GSButton from '@components/common/GSButton';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import icon_goback from '@assets/icon_goback.png';
import icon_search from '@assets/icon_search.png';

import { COLORS } from '@styles/colors';

export default function FeedsListContainer({
  title,
  subText = '',
  children,
  titleIcon = null,
  showButton = true,
  isProfessorReview = true,
}: {
  title: string;
  subText?: string;
  children: React.ReactNode;
  titleIcon?: ImageSourcePropType | null;
  showButton?: boolean;
  isProfessorReview?: boolean;
}) {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const openNewFeedModal = useNewFeedStore(state => state.openNewFeedModal);
  const setIsFreeFeed = useNewFeedStore(state => state.setIsFreeFeed);

  const handleWriteReviewPress = () => {
    if (isProfessorReview) {
      openNewFeedModal();
    } else {
      setIsFreeFeed(true);
      openNewFeedModal();
    }
  };

  return (
    <SafeAreaLayout backgroundColor={COLORS.WHITE} noBottomPadding>
      <GSHeader
        title=""
        leftComponent={
          <Image source={icon_goback} style={{ width: 28, height: 28 }} />
        }
        onLeftComponentPress={navigation.goBack}
      />
      <View style={styles.container}>
        <Spacer type="height" value={30} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Title title={title} titleIcon={titleIcon} subText={subText} />
          <TouchableOpacity style={{ marginTop: 8 }}>
            <Image source={icon_search} style={{ width: 28, height: 28 }} />
          </TouchableOpacity>
        </View>
        <Spacer type="height" value={24} />
      </View>

      {showButton && (
        <View
          style={{
            paddingHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: bottom,
            width: '100%',
            zIndex: 100,
          }}
        >
          <GSButton
            buttonText={
              isProfessorReview ? '교수님 리뷰 작성하기' : '피드 작성하기'
            }
            onPress={handleWriteReviewPress}
            fontSize={16}
          />
        </View>
      )}

      <View style={styles.feedsContainer}>
        <Spacer type="height" value={20} />
        {children}
      </View>
    </SafeAreaLayout>
  );
}

const Title = ({
  title,
  titleIcon = null,
  subText,
}: {
  title: string;
  titleIcon: ImageSourcePropType | null;
  subText: string;
}) => {
  if (titleIcon) {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Image source={titleIcon} style={{ width: 28, height: 28 }} />
          <Spacer type="width" value={4} />
          <GSText style={styles.titleText}>{title}</GSText>
        </View>

        <Spacer type="height" value={6} />

        {subText !== '' && (
          <GSText
            style={{ fontSize: 10, fontWeight: '400', color: COLORS.GRAY_400 }}
          >
            {subText}
          </GSText>
        )}
      </View>
    );
  }
  return <GSText style={styles.titleText}>{title}</GSText>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600',
  },
  feedsContainer: {
    backgroundColor: COLORS.GRAY_50,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: COLORS.BLUE_LIGHT_200,
    paddingHorizontal: 24,
  },
});
