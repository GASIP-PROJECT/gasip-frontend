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
      <TouchableOpacity style={{ flex: 1 }} onPress={onPress || undefined}>
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
  if (component === null)
    return <View style={styles.rightComponentContainer} />;

  return (
    <TouchableOpacity style={styles.rightComponentContainer} onPress={onPress}>
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
    textAlign: 'center',
  },

  leftComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rightComponentContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
});
