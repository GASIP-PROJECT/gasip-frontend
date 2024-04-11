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
import GSRadioButton from '@components/common/GSRadioButton';

import { COLORS } from '@styles/colors';

export default function SearchBar({
  setIsSearchPageOpen,
  setHasSearched,
}: {
  setIsSearchPageOpen: Dispatch<SetStateAction<boolean>>;
  setHasSearched: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResultType, setSearchResultType] = useState<
    'Professor' | 'Content'
  >('Professor');

  const handleCancelPress = () => {
    setIsSearchPageOpen(false);
  };

  const handleSearchSubmit = () => {
    setHasSearched(true);
    // TODO - 검색 시 호출되는 로직
    console.log(searchText);
    console.log(searchResultType);
  };

  const handleTextInputFocus = () => {
    setHasSearched(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.searchTextInput}
          placeholder="검색"
          placeholderTextColor={'#999999'}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={handleSearchSubmit}
          onFocus={handleTextInputFocus}
        />

        <View style={styles.searchIconContainer}>
          <Icon name="search-outline" size={20} style={{ color: '#999999' }} />
        </View>

        <Spacer type="width" value={8} />

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelPress}
        >
          <Text style={styles.cancelButtonText}>취소</Text>
        </TouchableOpacity>
      </View>
      <Spacer type="height" value={10} />

      <View style={{ flexDirection: 'row' }}>
        <SearchResultTypeSelector
          typeName="Professor"
          searchResultType={searchResultType}
          setSearchResultType={setSearchResultType}
        />
        <Spacer type="width" value={10} />
        <SearchResultTypeSelector
          typeName="Content"
          searchResultType={searchResultType}
          setSearchResultType={setSearchResultType}
        />
      </View>
    </>
  );
}

interface SearchResultTypeSelectorProps {
  typeName: 'Professor' | 'Content';
  searchResultType: 'Professor' | 'Content';
  setSearchResultType: Dispatch<SetStateAction<'Professor' | 'Content'>>;
}

const SearchResultTypeSelector = ({
  typeName,
  searchResultType,
  setSearchResultType,
}: SearchResultTypeSelectorProps) => {
  const isSelected = typeName === searchResultType;

  const handleTypePress = () => {
    setSearchResultType(typeName);
  };

  return (
    <View style={styles.searchResultTypeContainer}>
      <GSRadioButton isSelected={isSelected} onPress={handleTypePress} />
      <Spacer type="width" value={5} />
      <Text style={styles.searchResultTypeText}>{typeName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  searchTextInput: {
    flex: 1,
    fontSize: 16,
    height: 40,
    paddingLeft: 35,
    paddingRight: 15,
    borderRadius: 20,
    backgroundColor: '#545151',
    color: COLORS.WHITE,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
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
  searchResultTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchResultTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
});
