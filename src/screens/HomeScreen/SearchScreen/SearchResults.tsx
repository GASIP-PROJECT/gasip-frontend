import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FeedSummary from '@screens/HomeScreen/FeedsScreen/FeedSummary';

import Spacer from '@components/common/Spacer';

import {
  type Feed,
  type Professor,
  type SearchResult,
} from 'types/searchTypes';

// TODO - 컴포넌트 구조 뭔가 이상함. 수정 필요한 상태
export default function SearchResults({
  searchResults,
}: {
  searchResults: SearchResult[];
}) {
  if (searchResults.length === 0) {
    return <View />;
  }

  if (searchResults[0]?.profId) {
    return (
      <View>
        <ProfessorResults searchResult={searchResults as Professor[]} />
      </View>
    );
  }

  return (
    <View>
      <FeedResults searchResult={searchResults as Feed[]} />
    </View>
  );
}

const ProfessorResults = ({ searchResult }: { searchResult: Professor[] }) => {
  console.log(searchResult);

  return (
    <FlatList
      data={searchResult}
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

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProfessorDetailScreen', {
          professorData: professorData,
        });
      }}
    >
      <Text style={styles.professorInfo}>
        {majorName} - {profName} 교수님
      </Text>
    </TouchableOpacity>
  );
};

const FeedResults = ({ searchResult }: { searchResult: Feed[] }) => {
  return (
    <FlatList
      data={searchResult}
      renderItem={({ item }: { item: Feed }) => {
        return <FeedSummary feedData={item} />;
      }}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <Spacer type="height" value={10} />}
      ListFooterComponent={() => <Spacer type="height" value={150} />}
    />
  );
};

const styles = StyleSheet.create({
  professorInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: `#999999`,
  },
});
