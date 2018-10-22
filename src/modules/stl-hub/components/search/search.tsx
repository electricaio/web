import React, { SFC } from 'react';
import { AutoComplete, Button, Icon } from 'antd';
import { SearchContainer, SearchInput } from './search.css';

const dataSource = ['Active', 'Primary', 'Test'];

export const SearchItem: SFC = () => (
  <SearchContainer>
    <AutoComplete
      className="global-search"
      size="large"
      style={{ width: '100%' }}
      dataSource={dataSource}
      placeholder="Type to search some info"
      optionLabelProp="text"
    >
      <SearchInput
        suffix={(
          <Button className="search-btn" size="large" type="primary">
            <Icon type="search" />
          </Button>
        )}
      />
    </AutoComplete>
  </SearchContainer>
);