import { mount } from 'enzyme';
import React from 'react';
import { Header } from '../header';

import { Input } from 'antd';
import { ConnectorFilters } from '../filters';

const Search = Input.Search;

describe('Header', () => {
  beforeEach(() => {
    this.header = mount(<Header />);
  });

  it('has filter component', () => {
    expect(this.header.find(ConnectorFilters)).toHaveLength(1);
  });

  describe('Search', () => {
    beforeEach(() => {
      this.search = this.header.find(Search);
    });

    it('renders', () => {
      expect(this.search).toHaveLength(1);
    });

    it('has placeholder', () => {
      expect(this.search.prop('placeholder')).toBeTruthy();
    });

    it('has large input', () => {
      expect(this.search.prop('size')).toEqual('large');
    });
  });
});
