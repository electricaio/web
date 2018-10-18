import { shallow } from 'enzyme';
import React from 'react';
import { API_KEYS_TABLE_DATA } from '../../../../../fixtures/api-keys-table-data';
import { Table } from '../../table/table';
import { ApiKeys } from '../api-keys';
import { Card, StyledDiv } from '../api-keys.css';

describe('ApiKeys | api-keys Component', () => {
  beforeEach(() => {
    this.component = shallow(
      <ApiKeys
        data={API_KEYS_TABLE_DATA}
        onRefresh={() => {}}
        onRemove={() => {}}
        onCommit={() => {}}
      />
    );
  });

  it('renders', () => {
    expect(this.component).toHaveLength(1);
  });

  it('Has Card', () => {
    expect(this.component.find(Card)).toHaveLength(1);
  });

  it('Has Table', () => {
    expect(this.component.find(Table)).toHaveLength(1);
  });

  it('Has "new" button', () => {
    expect(this.component.find(StyledDiv)).toHaveLength(1);
  });
});
