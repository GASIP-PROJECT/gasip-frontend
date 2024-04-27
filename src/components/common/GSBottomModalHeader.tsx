import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '@styles/colors';

interface GSHeaderProps {
  title: string;
  leftComponent?: React.ReactNode | null;
  onLeftComponentPress?: (() => void) | null;
  rightComponent?: React.ReactNode | null;
  onRightComponentPress?: (() => void) | null;
}

export default function GSBottomModalHeader({
  title,
  leftComponent = null,
  onLeftComponentPress = null,
  rightComponent = null,
  onRightComponentPress = null,
}: GSHeaderProps) {
  return (
    <View style={styles.container}>
      <HeaderSideComponent
        component={leftComponent}
        onPress={onLeftComponentPress}
      />
      <HeaderTitle title={title} />
      <HeaderSideComponent
        component={rightComponent}
        onPress={onRightComponentPress}
        isRightButton={true}
      />
    </View>
  );
}

const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const HeaderSideComponent = ({
  component,
  onPress,
  isRightButton = false,
}: {
  component: React.ReactNode;
  onPress: (() => void) | null;
  isRightButton?: boolean;
}) => {
  if (component === null) return <View style={styles.sideComponentContainer} />;

  return (
    <View
      style={[
        styles.sideComponentContainer,
        { flexDirection: isRightButton ? 'row-reverse' : 'row' },
      ]}
    >
      <TouchableOpacity onPress={onPress || undefined}>
        {component}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  sideComponentContainer: {
    flex: 1,
  },
});
