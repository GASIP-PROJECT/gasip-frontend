import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { SearchCategoryType, SearchResult } from '@types/searchTypes';

import {
  searchFeeds,
  searchProfessors,
  searchProfessorsByMajor,
} from '@api/index';

import { SEARCH_CATEGORY } from '../constants';

interface SearchContextValueType {
  searchResults: SearchResult[];
  setSearchResults: Dispatch<SetStateAction<SearchResult[]>>;
  searchCategory: SearchCategoryType;
  setSearchCategory: Dispatch<SetStateAction<SearchCategoryType>>;
  noSearchResult: boolean;
  setNoSearchResult: Dispatch<SetStateAction<boolean>>;
  handleSearchSubmit: (searchText: string) => Promise<void>;
}

const defaultSearchContextValue: SearchContextValueType = {
  searchResults: [],
  setSearchResults: () => {},
  searchCategory: SEARCH_CATEGORY.PROFESSOR,
  setSearchCategory: () => {},
  noSearchResult: false,
  setNoSearchResult: () => {},
  handleSearchSubmit: async (): Promise<void> => {},
};

const SearchContext = createContext<SearchContextValueType>(
  defaultSearchContextValue,
);

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>(
    defaultSearchContextValue.searchResults,
  );
  const [searchCategory, setSearchCategory] = useState<SearchCategoryType>(
    defaultSearchContextValue.searchCategory,
  );
  const [noSearchResult, setNoSearchResult] = useState<boolean>(
    defaultSearchContextValue.noSearchResult,
  );

  const handleSearchSubmit = async (searchText: string) => {
    if (searchCategory === SEARCH_CATEGORY.PROFESSOR) {
      const professors = await searchProfessors(searchText);
      if (professors.length === 0) {
        setNoSearchResult(true);
      } else {
        setNoSearchResult(false);
      }

      setSearchResults([...professors]);
    }

    if (searchCategory === SEARCH_CATEGORY.MAJOR) {
      const professors = await searchProfessorsByMajor(searchText);

      if (professors.length === 0) {
        setNoSearchResult(true);
      } else {
        setNoSearchResult(false);
      }
      setSearchResults([...professors]);
    }

    if (searchCategory === SEARCH_CATEGORY.FEED) {
      const searchedFeeds = await searchFeeds(searchText);

      if (searchedFeeds.length === 0) {
        setNoSearchResult(true);
      } else {
        setNoSearchResult(false);
      }
      // setSearchResults([...searchedFeeds]);
      console.log(searchedFeeds);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults,
        searchCategory,
        setSearchCategory,
        noSearchResult,
        setNoSearchResult,
        handleSearchSubmit,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
