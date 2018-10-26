import * as React from 'react';
import { HeaderCard } from './header.css';
import { Input } from 'antd';
import { ConnectorFilters } from './filters';

export interface THeaderProps {}

const Search = Input.Search;

export class Header extends React.Component<THeaderProps, any> {
  public render() {
    return (
      <HeaderCard>
        <Search placeholder="E.g Salesforce" size="large" enterButton />
        <ConnectorFilters />
      </HeaderCard>
    );
  }
}
