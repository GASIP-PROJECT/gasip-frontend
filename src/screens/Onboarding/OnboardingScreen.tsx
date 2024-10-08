import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { MMKVStorage } from '@api/mmkv';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';
import OnboardingSwiper from './OnboardingSwiper';

import { COLORS } from '@styles/colors';

import backgroundImage from '@assets/img_background_onboarding.png';

export default function OnboardingScreen() {
  const handleStartOrSkipPress = () => {
    MMKVStorage.set('hasUserSeenOnboarding', true);
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Spacer type="height" value={10} />
        <SkipButton onPress={handleStartOrSkipPress} />
        <Spacer type="height" value={40} />
        <OnboardingSwiper />
        <StartButton onPress={handleStartOrSkipPress} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const SkipButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={{ flexDirection: 'row-reverse', paddingHorizontal: 32 }}>
      <TouchableOpacity onPress={onPress}>
        <GSText style={{ color: COLORS.GRAY_100 }}>건너뛰기</GSText>
      </TouchableOpacity>
    </View>
  );
};

const StartButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <GSText style={styles.buttonText}>시작하기</GSText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  button: {
    borderRadius: 16,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BLUE_PRIMARY,
    marginHorizontal: 32,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
});
