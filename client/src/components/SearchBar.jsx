import React from 'react';
import { SearchField } from './index';

export default function SearchBar(props) {
  const {
    handleHomeChange,
    handleSearch,
    handleTranslate,
    handleTrending,
    handleRandom,
  } = props;
  return (
    <nav className="search-bar-container">
      <SearchField
        handleHomeChange={handleHomeChange}
        handleSearch={handleSearch}
        handleTranslate={handleTranslate}
      />
      <div className="search-bar-button-container">
        <button
          className="search-bar-button"
          type="button"
          onClick={handleTrending}
        >
          What's hot!
        </button>
        <button
          className="search-bar-button"
          type="button"
          onClick={handleRandom}
        >
          I'm feelin' Giphy
        </button>
      </div>
    </nav>
  );
}
