import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';

import FeedSummary from '@screens/HomeScreen/FeedsScreen/FeedSummary';

import Spacer from '@components/common/Spacer';

import {
  type FeedResult,
  type ProfessorResult,
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
      <ProfessorResults searchResult={searchResults as ProfessorResult[]} />
    );
  }

  return <FeedResults searchResult={searchResults as FeedResult[]} />;
}

const ProfessorResults = ({
  searchResult,
}: {
  searchResult: ProfessorResult[];
}) => {
  return (
    <FlatList
      data={searchResult}
      renderItem={({ item }: { item: ProfessorResult }) => (
        <ProfessorInfo profName={item.profName} majorName={item.majorName} />
      )}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <Spacer type="height" value={15} />}
      ListFooterComponent={() => <Spacer type="height" value={150} />}
    />
  );
};

const ProfessorInfo = ({
  profName,
  majorName,
}: {
  profName: string;
  majorName: string;
}) => {
  return (
    <TouchableOpacity>
      <Text style={styles.professorInfo}>
        {majorName} - {profName} 교수님
      </Text>
    </TouchableOpacity>
  );
};

const FeedResults = ({ searchResult }: { searchResult: FeedResult[] }) => {
  return (
    <FlatList
      data={searchResult}
      renderItem={({ item }: { item: FeedResult }) => {
        return (
          <FeedSummary
            content={item.content}
            likeCount={item.likeCount}
            clickCount={item.clickCount}
            regDate={item.regDate}
          />
        );
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
