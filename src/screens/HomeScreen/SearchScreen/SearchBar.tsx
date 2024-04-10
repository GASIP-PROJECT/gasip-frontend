import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Spacer from '@components/common/Spacer';

import { COLORS } from '@styles/colors';

export default function SearchBar({
  setIsSearchPageOpen,
}: {
  setIsSearchPageOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchText, setSearchText] = useState<string>('');

  const handleCancelPress = () => {
    setIsSearchPageOpen(false);
  };

  const handleSubmit = () => {
    // TODO - 검색 시 호출되는 로직
    console.log(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchTextInput}
        placeholder="검색"
        placeholderTextColor={'#999999'}
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={handleSubmit}
      />

      <View style={styles.searchIconContainer}>
        <Icon name="search-outline" size={20} style={{ color: '#999999' }} />
      </View>

      <Spacer type="width" value={8} />

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
        <Text style={styles.cancelButtonText}>취소</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  searchTextInput: {
    flex: 1,
    fontSize: 16,
    height: 40,
    paddingLeft: 40,
    paddingRight: 15,
    borderRadius: 20,
    backgroundColor: '#545151',
    color: COLORS.WHITE,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 5,
  },
  cancelButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  searchIconContainer: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
});
