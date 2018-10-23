import { shallow } from 'enzyme';
import React from 'react';
import { API_KEYS_TABLE_DATA } from '../../../../../fixtures/api-keys-table-data';
import { ApiKeysTable } from '../table';
import { Table } from 'antd';
import { TApiKeyTableEntity } from '../../../../../models/ApiKeyTableEntity';

describe('ApiKeys | table Component', () => {
  const data: TApiKeyTableEntity[] = [
    {
      id: 'asdasdsad',
      name: 'Development',
      key: '14f4a1c0-e3sd5-5842-c7b3-162db8b95wex',
      created: new Date('02/03/2018'),
    },
    {
      id: 'qweqwe',
      name: 'Staging',
      key: '14f4a1c0-e6csd-5842-c7b3-162db8b95cc3',
      created: new Date('01/02/2018'),
    },
    {
      id: 'zxczxc',
      name: 'Production',
      key: '14s4a1c0-e365-5ds42-c7b3-162db8b95cc3',
      created: new Date('01/04/2018'),
    },
  ];

  const onRemoveMock = jest.fn();
  beforeEach(() => {
    this.component = shallow(
      <ApiKeysTable data={API_KEYS_TABLE_DATA} onRemove={onRemoveMock} onCommit={() => {}} />
    );
  });

  it('renders 4 columns', () => {
    expect(this.component.find(Table).prop('columns')).toHaveLength(4);
  });

  it('passes in data to table', () => {
    expect(this.component.find(Table).prop('dataSource')).toEqual(data);
  });

  it('passes entity name to action buttons', () => {
    const actionButtonColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: TApiKeyTableEntity) => col.key === 'action');
    const entity = {
      id: '123',
      name: 'test',
    };
    const actionButtons = actionButtonColumn.render(entity);
    expect(actionButtons.props.name).toEqual(entity.name);
  });

  it('calls onRemove props when delete action button is called', () => {
    const actionButtonColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: TApiKeyTableEntity) => col.key === 'action');
    const entity = {
      id: '123',
      name: 'test',
    };
    const actionButtons = actionButtonColumn.render(entity);
    actionButtons.props.onRemove();
    expect(onRemoveMock).toBeCalled();
  });
});
