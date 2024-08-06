import React from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';

import { COLORS } from '@styles/colors';

const width = Dimensions.get('window').width;

interface OnboardingSwiperIndicatorProps {
  onboardingScreenData: any;
  scrollX: Animated.Value;
  index: number;
}

export default function OnboardingSwiperIndicator({
  onboardingScreenData,
  scrollX,
  index,
}: OnboardingSwiperIndicatorProps) {
  return (
    <View style={styles.container}>
      {onboardingScreenData.map((_: any, idx: number) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 32, 8],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={idx}
            style={{
              ...styles.dot,
              width: dotWidth, // dotWidth가 변경되면서 애니메이션 효과가 나타난다.
              backgroundColor:
                index === idx ? COLORS.BLUE_PRIMARY : COLORS.GRAY_500,
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: COLORS.GRAY_500,
  },
});
