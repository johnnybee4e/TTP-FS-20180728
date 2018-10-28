import React from 'react';
import { SearchField } from './index';

export default function SearchBar(props) {
  const { handleChange, handleSearch, handleTranslate, handleRandom } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <SearchField
        handleChange={handleChange}
        handleSearch={handleSearch}
        handleTranslate={handleTranslate}
      />
      <button type='Button' onClick={handleRandom}>Random</button>
    </nav>
  );
}
