import React from 'react';
import { SearchField } from './index';

export default function SearchBar(props) {
  const { handleHomeChange, handleSearch, handleTranslate, handleTrending, handleRandom } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <SearchField
        handleHomeChange={handleHomeChange}
        handleSearch={handleSearch}
        handleTranslate={handleTranslate}
      />
      <button type='button' onClick={handleTrending}>Trending</button>
      <button type='button' onClick={handleRandom}>Random</button>
    </nav>
  );
}
