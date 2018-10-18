import { shallow } from 'enzyme';
import React from 'react';
import { API_KEYS_TABLE_DATA } from '../../../../../fixtures/api-keys-table-data';
import { Table, Thead } from '../table';

describe('ApiKeys | table Component', () => {
  beforeEach(() => {
    this.component = shallow(
      <Table
        data={API_KEYS_TABLE_DATA}
        isNewEntity={true}
        onRemove={() => {}}
        onRefresh={() => {}}
        onCommit={() => {}}
      />
    );
  });

  it('renders', () => {
    expect(this.component).toHaveLength(1);
  });

  it('Has header', () => {
    expect(this.component.find(Thead)).toHaveLength(1);
  });

  it('Has body', () => {
    expect(this.component.find('tbody')).toHaveLength(1);
  });

  it('Has data rows && new entity row', () => {
    expect(this.component.find('tbody').children()).toHaveLength(4);
  });
});
