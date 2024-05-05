import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import icon_user from '@assets/icon_user.png';
import gasip_logo from '@assets/gasip_logo.png';
import icon_goback from '@assets/icon_goback.png';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreenHeader() {
  const navigation = useNavigation();

  const handleBackButtonPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleBackButtonPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Image source={icon_goback} style={{ width: 28, height: 28 }} />
      </TouchableOpacity>

      <Image
        source={gasip_logo}
        style={{ width: 100, height: 40 }}
        resizeMode="contain"
      />

      <TouchableOpacity>
        <Image source={icon_user} style={{ width: 28, height: 28 }} />
      </TouchableOpacity>
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
