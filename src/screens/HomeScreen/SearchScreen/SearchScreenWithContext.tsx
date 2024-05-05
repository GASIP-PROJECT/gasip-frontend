import React from 'react';
import SearchScreen from './SearchScreen';

import { SearchContextProvider } from '@contexts/SearchContext';

export default function SearchScreenWithContext() {
  return (
    <SearchContextProvider>
      <SearchScreen />
    </SearchContextProvider>
  );
}
