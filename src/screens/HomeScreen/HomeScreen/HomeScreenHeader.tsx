import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import icon_user from '@assets/icon_user.png';
import gasip_logo from '@assets/gasip_logo.png';

export default function HomeScreenHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={gasip_logo}
        style={{ width: 100, height: 40 }}
        resizeMode="contain"
      />

      <TouchableOpacity onPress={() => navigation.navigate('MyPageScreen')}>
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
