import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import { useSearchContext } from '@contexts/SearchContext';
import useNewFeedStore from '@store/newFeedStore';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';
import GSRadioButton from '@components/common/GSRadioButton';
import GSTopIndicator from '@components/common/GSTopIndicator';

import { COLORS } from '@styles/colors';
import { SEARCH_CATEGORY } from '@constants';
import { Professor, SearchCategoryType } from '@types/searchTypes';

import icon_search from '@assets/icon_search.png';
import icon_smiley from '@assets/icon_smiley.png';
import icon_x_face from '@assets/icon_x_face.png';
import icon_x_circle from '@assets/icon_x_circle.png';

interface SelectProfessorModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

export default function SelectProfessorModal({
  isVisible,
  closeModal,
}: SelectProfessorModalProps) {
  const { searchResults, noSearchResult, setNoSearchResult } =
    useSearchContext();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      style={styles.view}
      useNativeDriverForBackdrop
      backdropOpacity={0}
    >
      <View style={styles.container}>
        <Spacer type="height" value={12} />
        <GSTopIndicator />
        <Spacer type="height" value={12} />
        <SearchBar />
        <Spacer type="height" value={28} />
        <Divider />
        {noSearchResult ? (
          <NoSearchResult />
        ) : searchResults.length > 0 ? (
          <SearchResults closeModal={closeModal} />
        ) : (
          <SearchResultsPlaceholder />
        )}
      </View>
    </Modal>
  );
}

const Divider = () => {
  return <View style={styles.divider} />;
};

const SearchResultsPlaceholder = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Spacer type="height" value={70} />
      <GSText style={styles.searchResultsPlaceholderText}>
        작성 전, 교수님 or 학과를 먼저 검색해주세요:)
      </GSText>
      <Spacer type="height" value={16} />
      <Image source={icon_smiley} style={{ width: 80, height: 80 }} />
    </View>
  );
};

const SearchBar = () => {
  const { setNoSearchResult, handleSearchSubmit } = useSearchContext();
  const [searchText, setSearchText] = useState<string>('');

  const handleTextInputFocus = () => {
    setNoSearchResult(false);
  };

  const clearSearchText = () => {
    setNoSearchResult(false);
    setSearchText('');
  };

  const onSubmit = async () => {
    await handleSearchSubmit(searchText);
  };

  return (
    <>
      <View>
        <TextInput
          style={styles.searchTextInput}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={onSubmit}
          onFocus={handleTextInputFocus}
          value={searchText}
          autoFocus
        />

        {searchText !== '' ? (
          <TouchableOpacity
            style={styles.searchIconContainer}
            hitSlop={{ top: 8, bottom: 8, right: 8, left: 8 }}
            onPress={clearSearchText}
          >
            <Image source={icon_x_circle} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        ) : (
          <View style={styles.searchIconContainer}>
            <Image source={icon_search} style={{ width: 24, height: 24 }} />
          </View>
        )}
      </View>

      <Spacer type="height" value={8} />

      <View style={{ flexDirection: 'row' }}>
        <Spacer type="width" value={10} />
        <SearchResultTypeSelector category={SEARCH_CATEGORY.PROFESSOR} />
        <Spacer type="width" value={10} />
        <SearchResultTypeSelector category={SEARCH_CATEGORY.MAJOR} />
      </View>
    </>
  );
};

const SearchResultTypeSelector = ({
  category,
}: {
  category: SearchCategoryType;
}) => {
  const { setSearchResults, searchCategory, setSearchCategory } =
    useSearchContext();

  const isSelected = category === searchCategory;

  const handleTypePress = () => {
    setSearchResults([]);
    setSearchCategory(category);
  };

  return (
    <View style={styles.searchResultTypeContainer}>
      <GSRadioButton isSelected={isSelected} onPress={handleTypePress} />
      <Spacer type="width" value={5} />
      <GSText style={styles.searchResultTypeText}>{category}</GSText>
    </View>
  );
};

const NoSearchResult = () => {
  return (
    <View style={styles.noSearchResultContainer}>
      <Spacer type="height" value={70} />
      <Image
        source={icon_x_face}
        style={{ width: 80, height: 80, tintColor: COLORS.GRAY_200 }}
      />
      <Spacer type="height" value={16} />
      <GSText style={styles.noSearchResultText}>검색 결과가 없어요</GSText>
    </View>
  );
};

const SearchResults = ({ closeModal }) => {
  const { searchResults } = useSearchContext();

  if (searchResults.length === 0) {
    return <View />;
  }

  return (
    <View>
      <Spacer type="height" value={24} />
      <ProfessorResults closeModal={closeModal} />
    </View>
  );
};

const ProfessorResults = ({ closeModal }) => {
  const { searchResults } = useSearchContext();

  return (
    <FlatList
      data={searchResults as Professor[]}
      renderItem={({ item }: { item: Professor }) => (
        <ProfessorInfo professorData={item} closeModal={closeModal} />
      )}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <Spacer type="height" value={15} />}
      ListFooterComponent={() => <Spacer type="height" value={150} />}
    />
  );
};

const ProfessorInfo = ({
  professorData,
  closeModal,
}: {
  professorData: Professor;
  closeModal: () => void;
}) => {
  const { majorName, profName, profId } = professorData;

  const setSelectedProfData = useNewFeedStore(
    state => state.setSelectedProfData,
  );

  const handleProfessorPress = () => {
    setSelectedProfData(profId, profName);
    closeModal();
  };

  return (
    <TouchableOpacity
      onPress={handleProfessorPress}
      style={styles.searchResultItemContainer}
    >
      <Image source={icon_search} style={{ width: 24, height: 24 }} />
      <Spacer type="width" value={10} />
      <GSText style={styles.professorInfo}>
        {majorName} - {profName} 교수님
      </GSText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    height: '75%',
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: COLORS.BLUE_PRIMARY,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: 20,
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.GRAY_100,
  },
  searchResultsPlaceholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_200,
  },
  searchIconContainer: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  searchResultTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchResultTypeText: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.BLACK,
  },
  searchTextInput: {
    height: 44,
    borderRadius: 100,
    borderColor: COLORS.BLUE_LIGHT_100,
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    color: COLORS.BLACK,
    fontSize: 16,
    shadowColor: COLORS.BLUE_LIGHT_100,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  noSearchResultContainer: {
    width: '100%',
    alignItems: 'center',
  },
  noSearchResultText: {
    fontSize: 16,
    color: COLORS.GRAY_400,
  },
  professorInfo: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  searchResultItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
