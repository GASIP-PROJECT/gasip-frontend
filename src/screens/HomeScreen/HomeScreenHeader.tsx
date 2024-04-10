import React, { Dispatch, SetStateAction } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
          <Icon
            name="search-outline"
            size={27}
            // TODO - marginTop 10 여러 디바이스에서 검즘 필요
            style={{ color: '#999999', marginTop: 10 }}
          />
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
