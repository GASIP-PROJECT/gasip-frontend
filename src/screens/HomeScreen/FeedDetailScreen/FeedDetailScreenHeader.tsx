import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS } from '@styles/colors';

// TODO - ICON_SIZE 여기 선언하는게 맞는가?
const ICON_SIZE = 27;

export default function FeedDetailScreenHeader() {
  return (
    <View style={styles.container}>
      <HeaderCloseButton />
      <HeaderTitle />
      <View style={{ flex: 1 }} />
    </View>
  );
}

const HeaderCloseButton = () => {
  const navigation = useNavigation();

  const closeModal = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.closeButtonContainer}>
      <TouchableOpacity style={{ flex: 1 }} onPress={closeModal}>
        <Icon
          name="chevron-back-outline"
          size={ICON_SIZE}
          style={{ color: COLORS.WHITE }}
        />
      </TouchableOpacity>
    </View>
  );
};

const HeaderTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>게시글 상세</Text>
    </View>
  );
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
  letterCountContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  letterCountText: {
    color: COLORS.WHITE,
    fontSize: 12,
  },
  closeButtonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
