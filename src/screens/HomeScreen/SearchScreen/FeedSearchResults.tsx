import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useSearchContext } from '@contexts/SearchContext';

import Spacer from '@components/common/Spacer';
import FeedSummary from '@screens/HomeScreen/FeedsScreen/FeedSummary';

import { Feed } from '@types/searchTypes';

export default function FeedSearchResults() {
  const { searchResults } = useSearchContext();

  return (
    <View style={{ paddingHorizontal: 24 }}>
      <FlatList
        // TODO - feedData에 searchResults type 데이터 넣어서 발생하는 이슈 해결
        data={searchResults}
        renderItem={({ item, index }: { item: Feed; index: number }) => {
          return (
            <FeedSummary
              feedData={item}
              isLastElement={index === searchResults.length - 1}
              showProfNameTag={false}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <Spacer type="height" value={8} />}
        ListFooterComponent={() => <Spacer type="height" value={150} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
