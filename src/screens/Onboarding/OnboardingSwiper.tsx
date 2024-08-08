import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';

import OnboardingSwiperIndicator from './OnboardingSwiperIndicator';

import { COLORS } from '@styles/colors';

import firstCardIcon from '@assets/icon_onboarding_page_1.png';
import secondCardIcon from '@assets/icon_onboarding_page_2.png';
import thirdCardIcon from '@assets/icon_onboarding_page_3.png';
import fourthCardIcon from '@assets/icon_onboarding_page_4.png';

import firstCardImage from '@assets/img_onboarding_page_1.png';
import secondCardImage from '@assets/img_onboarding_page_2.png';
import thirdCardImage from '@assets/img_onboarding_page_3.png';
import fourthCardImage from '@assets/img_onboarding_page_4.png';

import firstCardText from '@assets/img_text_onboarding_page_1.png';
import secondCardText from '@assets/img_text_onboarding_page_2.png';
import thirdCardText from '@assets/img_text_onboarding_page_3.png';
import fourthCardText from '@assets/img_text_onboarding_page_4.png';

interface OnboardingPageData {
  text: any;
  image: any;
  icon: any;
}

const ONBOARDING_PAGES_DATA = [
  {
    text: firstCardText,
    image: firstCardImage,
    icon: firstCardIcon,
  },
  {
    text: secondCardText,
    image: secondCardImage,
    icon: secondCardIcon,
  },
  {
    text: thirdCardText,
    image: thirdCardImage,
    icon: thirdCardIcon,
  },
  {
    text: fourthCardText,
    image: fourthCardImage,
    icon: fourthCardIcon,
  },
];

const screenWidth = Dimensions.get('window').width;

export default function OnboardingSwiper() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  const handleOnScroll = event => {
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false, // JS 스레드에서 동작하도록 한다.
    })(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={ONBOARDING_PAGES_DATA}
        renderItem={renderItem}
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <OnboardingSwiperIndicator
        onboardingScreenData={ONBOARDING_PAGES_DATA}
        scrollX={scrollX}
        index={index}
      />
    </View>
  );
}

const renderItem = ({ item }: { item: OnboardingPageData }) => {
  return <SwiperItem text={item.text} image={item.image} icon={item.icon} />;
};

const SwiperItem = ({ text, image, icon }: OnboardingPageData) => {
  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          justifyContent: 'center',
          width: '100%',
          paddingHorizontal: 32,
        }}
      >
        <Image source={icon} style={{ width: 52, height: 52 }} />
        <Image
          source={text}
          style={{ width: 290, height: 115 }}
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image source={image} style={{ width: 200, height: 200 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    width: screenWidth,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 38,
    color: COLORS.WHITE,
  },
});
