import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import Spacer from '@components/common/Spacer';
import GSIcon from '@components/common/GSIcon';

import { COLORS } from '@styles/colors';

export default function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#3e3b3b',
        borderRadius: 15,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <View
            style={{
              flex: 1,
              height: 80,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={route.key}
          >
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
            >
              <BottomTabIcon index={index} isFocused={isFocused} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const BottomTabIcon = ({
  index,
  isFocused,
}: {
  index: number;
  isFocused: boolean;
}) => {
  if (index === 0) {
    return (
      <GSIcon
        name="home-outline"
        size={30}
        color={isFocused ? COLORS.BTN_MAIN : COLORS.WHITE}
      />
    );
  }

  if (index === 1) {
    return <CreateFeedButton />;
  }

  if (index === 2) {
    return (
      <GSIcon
        name="person-circle-outline"
        size={35}
        color={isFocused ? COLORS.BTN_MAIN : COLORS.WHITE}
      />
    );
  }

  return (
    <GSIcon
      name="home-outline"
      size={30}
      color={isFocused ? COLORS.BTN_MAIN : COLORS.WHITE}
    />
  );
};

const CreateFeedButton = () => {
  return (
    <View
      style={{
        borderRadius: 30,
        height: '80%',
        width: 100,
        backgroundColor: COLORS.BTN_MAIN,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <GSIcon name="add-outline" size={30} />

      <Spacer type="width" value={5} />

      <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.WHITE }}>
        Feed
      </Text>
    </View>
  );
};
