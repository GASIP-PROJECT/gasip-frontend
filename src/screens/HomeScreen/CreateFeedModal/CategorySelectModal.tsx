import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import { searchProfessors } from '@api/index';

import Spacer from '@components/common/Spacer';
import GSIcon from '@components/common/GSIcon';
import GSBottomModalHeader from '@components/common/GSBottomModalHeader';

import { COLORS } from '@styles/colors';
import { Professor } from '@types/searchTypes';
import { FEED_CATEGORIES } from '../../../constants';
import { SelectedCategory } from './CreateFeedModal';

interface CategorySelectModalProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
  setSelectedCategory: Dispatch<SetStateAction<SelectedCategory>>;
}

export default function CategorySelectModal({
  actionSheetRef,
  setSelectedCategory,
}: CategorySelectModalProps) {
  const [isProfessorSearchOpen, setIsProfessorSearchOpen] =
    useState<boolean>(false);

  const handleCategoryPress = (category: string, profId?: number) => {
    setSelectedCategory(prevState => ({ ...prevState, category, profId }));
    actionSheetRef.current?.hide();
  };

  const handleProfessorSearchPress = () => {
    setIsProfessorSearchOpen(true);
  };

  const closeCategorySelectModal = () => {
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={styles.rateActionSheetContainer}
      defaultOverlayOpacity={0.9}
      onBeforeShow={() => setIsProfessorSearchOpen(false)}
    >
      <View style={styles.categoriesContainer}>
        <Spacer type="height" value={10} />

        <Spacer type="height" value={10} />
        {isProfessorSearchOpen ? (
          <>
            <GSBottomModalHeader
              title={'교수님 검색'}
              leftComponent={<GSIcon name="chevron-back-outline" />}
              onLeftComponentPress={() => setIsProfessorSearchOpen(false)}
              rightComponent={<GSIcon name="close-outline" />}
              onRightComponentPress={closeCategorySelectModal}
            />
            <Spacer type="height" value={10} />
            <ProfessorSearch handleCategoryPress={handleCategoryPress} />
          </>
        ) : (
          <>
            <GSBottomModalHeader
              title={'카테고리 선택'}
              rightComponent={<GSIcon name="close-outline" />}
              onRightComponentPress={closeCategorySelectModal}
            />
            <Spacer type="height" value={20} />
            <CategoryButton
              category={FEED_CATEGORIES.FREE}
              onPress={() => handleCategoryPress(FEED_CATEGORIES.FREE)}
            />
            <Spacer type="height" value={10} />
            <CategoryButton
              category={FEED_CATEGORIES.SEARCH_PROFESSOR}
              onPress={handleProfessorSearchPress}
            />
          </>
        )}
      </View>
    </ActionSheet>
  );
}

const CategoryButton = ({
  category,
  onPress,
}: {
  category: string;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <TouchableOpacity style={styles.categoryButton} onPress={onPress}>
      <Text style={styles.categoryButtonText}>{category}</Text>
    </TouchableOpacity>
  );
};

const ProfessorSearch = ({
  handleCategoryPress,
}: {
  handleCategoryPress: (category: string) => void;
}) => {
  const [noSearchResult, setNoSearchResult] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<Professor>>([]);

  return (
    <View style={{}}>
      <Spacer type="height" value={20} />
      <ProfessorSearchBar
        setNoSearchResult={setNoSearchResult}
        setSearchResults={setSearchResults}
      />
      <Spacer type="height" value={20} />
      <ProfessorSearchResults
        noSearchResult={noSearchResult}
        searchResults={searchResults}
        handleCategoryPress={handleCategoryPress}
      />
    </View>
  );
};

const ProfessorSearchBar = ({
  setNoSearchResult,
  setSearchResults,
}: {
  setNoSearchResult: Dispatch<SetStateAction<boolean>>;
  setSearchResults: Dispatch<SetStateAction<Array<Professor>>>;
}) => {
  const textInputRef = useRef<TextInput>();
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchSubmit = async () => {
    const professors = await searchProfessors(searchText);
    // console.log(professors);
    if (professors.length === 0) {
      setNoSearchResult(true);
    } else {
      setNoSearchResult(false);
    }
    setSearchResults([...professors]);
  };

  const handleTextInputFocus = () => {
    setNoSearchResult(false);
  };

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        ref={textInputRef}
        style={styles.searchTextInput}
        placeholder="교수님을 검색하세요."
        placeholderTextColor={'#999999'}
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={handleSearchSubmit}
        onFocus={handleTextInputFocus}
      />
      <View style={styles.searchIconContainer}>
        <GSIcon name="search-outline" size={20} color="#999999" />
      </View>
    </View>
  );
};

const ProfessorSearchResults = ({
  searchResults,
  noSearchResult,
  handleCategoryPress,
}: {
  searchResults: Array<Professor>;
  noSearchResult: boolean;
  handleCategoryPress: (category: string, profId: number) => void;
}) => {
  if (noSearchResult)
    return (
      <View
        style={[
          styles.searchResultsContainer,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text style={styles.noSearchResultText}>검색 결과가 없습니다.</Text>
      </View>
    );
  return (
    <ScrollView style={styles.searchResultsContainer}>
      {searchResults.map((professor, index) => (
        <TouchableOpacity
          key={index.toString()}
          onPress={() =>
            handleCategoryPress(
              `${professor.profName} 교수님`,
              professor.profId,
            )
          }
        >
          <Text style={styles.searchResultText}>
            {professor.profName} 교수님
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rateActionSheetContainer: {
    backgroundColor: '#28292A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  categoriesContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  categoryButtonText: {
    color: '#a9a9a9',
    fontSize: 16,
    fontWeight: '700',
  },
  searchTextInput: {
    width: '100%',
    fontSize: 16,
    height: 40,
    paddingLeft: 35,
    paddingRight: 15,
    borderRadius: 20,
    backgroundColor: '#545151',
    color: COLORS.WHITE,
  },
  searchIconContainer: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
  },
  searchResultsContainer: {
    paddingHorizontal: 10,
    height: 200,
    width: '100%',
  },
  searchResultText: {
    fontSize: 20,
    color: COLORS.WHITE,
    fontWeight: '700',
  },
  noSearchResultText: {
    fontSize: 16,
    color: '#a9a9a9',
    fontWeight: '500',
  },
});
