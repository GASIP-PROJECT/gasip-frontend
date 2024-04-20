import React, { Dispatch, SetStateAction } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import GSIcon from '@components/common/GSIcon';

import gasip_logo from '@assets/gasip_logo.png';

interface HomeScreenHeaderProps {
  isSearchPageOpen: boolean;
  setIsSearchPageOpen: Dispatch<SetStateAction<boolean>>;
}

export default function HomeScreenHeader({
  isSearchPageOpen,
  setIsSearchPageOpen,
}: HomeScreenHeaderProps) {
  const handleSearchIconPress = () => {
    setIsSearchPageOpen(true);
  };

  return (
    <View style={styles.container}>
      <Image source={gasip_logo} style={{ width: 120, height: 50 }} />

      {!isSearchPageOpen && (
        <TouchableOpacity onPress={handleSearchIconPress}>
          <GSIcon name="search" color="#999999" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
