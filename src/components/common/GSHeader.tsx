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

export default function GSHeader({
  title,
  leftComponent = null,
  onLeftComponentPress = null,
  rightComponent = null,
  onRightComponentPress = null,
}: GSHeaderProps) {
  return (
    <View style={styles.container}>
      <HeaderLeftComponent
        component={leftComponent}
        onPress={onLeftComponentPress}
      />
      <HeaderTitle title={title} />
      <HeaderRightComponent />
    </View>
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
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const HeaderRightComponent = () => {
  return <View style={styles.rightComponentContainer} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
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
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: COLORS.WHITE,
  },

  leftComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rightComponentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
