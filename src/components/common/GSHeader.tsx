import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Spacer from './Spacer';

import { COLORS } from '@styles/colors';

interface GSHeaderProps {
  title: string;
  leftComponent?: React.ReactNode | null;
  onLeftComponentPress?: (() => void) | null;
  rightComponent?: React.ReactNode | null;
  onRightComponentPress?: (() => void) | null;
}

export default function GSHeader({
  title,
  leftComponent = null,
  onLeftComponentPress = null,
  rightComponent = null,
  onRightComponentPress = null,
}: GSHeaderProps) {
  return (
    <>
      <Spacer type="height" value={10} />
      <View style={styles.container}>
        <HeaderLeftComponent
          component={leftComponent}
          onPress={onLeftComponentPress}
        />
        <HeaderTitle title={title} />
        <HeaderRightComponent component={rightComponent} />
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
      <Text style={styles.title} adjustsFontSizeToFit numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

const HeaderRightComponent = ({
  component,
}: {
  component: React.ReactNode;
}) => {
  if (component === null)
    return <View style={styles.rightComponentContainer} />;

  return <View style={styles.rightComponentContainer}>{component}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // height: 50,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    // color: COLORS.WHITE,
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
