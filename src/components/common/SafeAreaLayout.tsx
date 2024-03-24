// react-native-safe-area-context에서 제공하는 useSafeAreaInsets hook을 사용하여 safe area를 구현한 컴포넌트
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '@styles/colors';

export default function SafeAreaLayout({
  noTopPadding = false,
  noBottomPadding = false,
  backgroundColor = COLORS.WHITE, // TODO(setting) - 컬러 따로 빼서 처리
  ...props
}) {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={[
        props.style,
        {
          backgroundColor: backgroundColor,
          paddingTop: noTopPadding ? 0 : safeAreaInsets.top,
          paddingBottom: noBottomPadding ? 0 : safeAreaInsets.bottom,
        },
      ]}
    />
  );
}
