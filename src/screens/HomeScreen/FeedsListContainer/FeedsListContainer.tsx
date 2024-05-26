import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useNewFeedStore from '@store/newFeedStore';

import Spacer from '@components/common/Spacer';
import GSText from '@components/common/GSText';
import GSButton from '@components/common/GSButton';
import GSHeader from '@components/common/GSHeader';
import SafeAreaLayout from '@components/common/SafeAreaLayout';

import icon_house from '@assets/icon_house.png';
import icon_goback from '@assets/icon_goback.png';

import { COLORS } from '@styles/colors';

export default function FeedsListContainer({
  title,
  children,
  titleIcon = null,
  showButton = true,
  isProfessorReview = true,
}: {
  title: string;
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
        rightComponent={
          <Image source={icon_house} style={{ width: 28, height: 28 }} />
        }
        onRightComponentPress={() => {
          navigation.navigate('HomeScreen');
        }}
      />
      <View style={styles.container}>
        <Spacer type="height" value={30} />
        <Title title={title} titleIcon={titleIcon} />
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
        <Spacer type="height" value={16} />
        {children}
      </View>
    </SafeAreaLayout>
  );
}

const Title = ({
  title,
  titleIcon = null,
}: {
  title: string;
  titleIcon: ImageSourcePropType | null;
}) => {
  if (titleIcon) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image source={titleIcon} style={{ width: 28, height: 28 }} />
        <Spacer type="width" value={4} />
        <GSText style={styles.titleText}>{title}</GSText>
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
