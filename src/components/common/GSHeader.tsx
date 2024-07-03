import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import GSText from '@components/common/GSText';

import Spacer from './Spacer';

interface GSHeaderProps {
  title: string;
  leftComponent?: React.ReactNode | null;
  onLeftComponentPress?: (() => void) | null;
  rightComponent?: React.ReactNode | null;
  onRightComponentPress?: (() => void) | null;
  paddingHorizontal?: number;
}

// TODO - 범용적으로 적용가능한 구조 만들기
// rightComponent를 꼭 전달해야하만 하는 구조에서 어떻게 개선할 수 있을지?
export default function GSHeader({
  title,
  leftComponent = null,
  onLeftComponentPress = null,
  rightComponent = null,
  onRightComponentPress = null,
  paddingHorizontal = 16,
}: GSHeaderProps) {
  return (
    <>
      <Spacer type="height" value={10} />
      <View
        style={[styles.container, { paddingHorizontal: paddingHorizontal }]}
      >
        <HeaderLeftComponent
          component={leftComponent}
          onPress={onLeftComponentPress}
        />
        <HeaderTitle title={title} />
        <HeaderRightComponent
          component={rightComponent}
          onPress={onRightComponentPress}
        />
      </View>
    </>
  );
}

const HeaderLeftComponent = ({
  component,
  onPress,
}: {
  component: React.ReactNode;
  onPress: (() => void) | null;
}) => {
  if (component === null) return <View style={styles.leftComponentContainer} />;

  return (
    <View style={styles.leftComponentContainer}>
      <TouchableOpacity onPress={onPress || undefined}>
        {component}
      </TouchableOpacity>
    </View>
  );
};

const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <View style={styles.titleContainer}>
      <GSText style={styles.title} adjustsFontSizeToFit numberOfLines={1}>
        {title}
      </GSText>
    </View>
  );
};

const HeaderRightComponent = ({
  component,
  onPress,
}: {
  component: React.ReactNode;
  onPress: (() => void) | null;
}) => {
  if (component === null) {
    return <View style={styles.rightComponentContainer} />;
  }

  return (
    <TouchableOpacity
      style={styles.rightComponentContainer}
      onPress={onPress || undefined}
      disabled={!onPress}
    >
      {component}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  leftComponentContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rightComponentContainer: {
    flexDirection: 'row-reverse',
  },
});
