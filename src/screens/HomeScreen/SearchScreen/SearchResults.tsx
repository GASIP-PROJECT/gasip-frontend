import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSearchContext } from '@contexts/SearchContext';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';
import GSTopIndicator from '@components/common/GSTopIndicator';

import { COLORS } from '@styles/colors';
import icon_search from '@assets/icon_search.png';
import { type Professor } from 'types/searchTypes';

// TODO - 컴포넌트 구조 뭔가 이상함. 수정 필요한 상태
export default function SearchResults() {
  const { searchResults } = useSearchContext();

  if (searchResults.length === 0) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Spacer type="height" value={12} />
      <GSTopIndicator />
      <Spacer type="height" value={22} />
      <ProfessorResults />
    </View>
  );
}

const ProfessorResults = () => {
  const { searchResults } = useSearchContext();

  return (
    <FlatList
      data={searchResults as Professor[]}
      renderItem={({ item }: { item: Professor }) => (
        <ProfessorInfo professorData={item} />
      )}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <Spacer type="height" value={15} />}
      ListFooterComponent={() => <Spacer type="height" value={150} />}
    />
  );
};

const ProfessorInfo = ({ professorData }: { professorData: Professor }) => {
  const navigation = useNavigation();

  const { majorName, profName } = professorData;

  const handleProfessorPress = () => {
    navigation.navigate('ProfessorDetailScreen', {
      professorData: professorData,
    });
  };

  return (
    <TouchableOpacity
      onPress={handleProfessorPress}
      style={styles.searchResultItemContainer}
    >
      <Image source={icon_search} style={{ width: 24, height: 24 }} />
      <Spacer type="width" value={10} />
      <GSText
        style={styles.professorInfo}
        adjustsFontSizeToFit
        numberOfLines={2}
      >
        {majorName} - {profName} 교수님
      </GSText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  professorInfo: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.BLACK,
    flexWrap: 'wrap',
    flex: 1,
  },
  searchResultItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 26,
    shadowColor: COLORS.BLUE_PRIMARY,
    shadowOffset: { width: 4, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
