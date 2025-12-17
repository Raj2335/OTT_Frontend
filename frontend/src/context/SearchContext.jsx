import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const clearSearch = () => {
    setSearchResults([]);
    setIsSearching(false);
    setSearchQuery('');
  };

  return (
    <SearchContext.Provider value={{ 
      searchResults, 
      setSearchResults, 
      isSearching, 
      setIsSearching,
      searchQuery,
      setSearchQuery,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
