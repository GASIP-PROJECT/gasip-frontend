import React, { Dispatch, SetStateAction } from 'react';
import { Button, StyleSheet, View } from 'react-native';

interface SearchScreenProps {
  isSearchPageOpen: boolean;
  setIsSearchPageOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchScreen({
  isSearchPageOpen,
  setIsSearchPageOpen,
}: SearchScreenProps) {
  return (
    <View>
      <Button
        title="검색창 닫음"
        onPress={() => {
          setIsSearchPageOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
