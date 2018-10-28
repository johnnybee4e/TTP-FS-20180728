import React from 'react';
import { SearchField } from './index';

export default function SearchBar(props) {
  const { handleChange, handleRequest } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <SearchField handleRequest={handleRequest} handleChange={handleChange} />
    </nav>
  );
}

