import React, { SFC } from 'react';
import { Input } from 'antd';
import { SearchContainer } from './search.css';

const Search = Input.Search;

export const SearchItem: SFC = () => (
  <SearchContainer>
    <Search
      placeholder="Type to search some info"
      onSearch={value => console.log(value)}
      enterButton
    />
  </SearchContainer>
);