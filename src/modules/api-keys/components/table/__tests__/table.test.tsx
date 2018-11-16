import { mount } from 'enzyme';
import React from 'react';
import { API_KEYS_TABLE_DATA } from '../../../../../fixtures/api-keys-table-data';
import { ApiKeysTable, KeyVisibility } from '../table';
import { Table } from 'antd';
import { StyledEye, KeyContainer } from '../table.css';
import { ApiKeyModal } from '../../../../../redux/api-keys/types';

describe('ApiKeys | table Component', () => {
  const data: ApiKeyModal[] = [
    {
      id: 1,
      name: 'Development',
      key: '14f4a1c0-e3sd5-5842-c7b3-162db8b95wex',
      created: new Date('02/03/2018'),
    },
    {
      id: 2,
      name: 'Staging',
      key: '14f4a1c0-e6csd-5842-c7b3-162db8b95cc3',
      created: new Date('01/02/2018'),
    },
    {
      id: 3,
      name: 'Production',
      key: '14s4a1c0-e365-5ds42-c7b3-162db8b95cc3',
      created: new Date('01/04/2018'),
    },
  ];

  const onRemoveMock = jest.fn();
  const userId =5;
  beforeEach(() => {
    this.component = mount(<ApiKeysTable data={API_KEYS_TABLE_DATA} userId={userId} onRemove={onRemoveMock} />);
  });

  it('renders 4 columns', () => {
    const columns = this.component.find(Table).prop('columns');
    const columnNames = columns.map((col: any) => col.title);
    expect(columnNames).toEqual(['Name', 'Key', 'Date Created', 'Action']);
  });

  it('passes in data to table', () => {
    expect(this.component.find(Table).prop('dataSource')).toEqual(data);
  });

  describe('KeyVisibility', () => {
    const key = '1234567';
    beforeEach(() => {
      const entity: ApiKeyModal = {
        name: 'test',
        id: 1,
        key: '1234567',
        created: new Date(),
      };
      this.keyVisibility = mount(<KeyVisibility entity={entity} />);
    });

    it('hides the api key with asterisks when loaded', () => {
      const hiddenApiKey = this.keyVisibility.find(KeyContainer).text();
      expect(hiddenApiKey).toContain('*');
      expect(hiddenApiKey).not.toEqual(key);
    });

    it('shows api key when eye is clicked', () => {
      this.keyVisibility.find(StyledEye).simulate('click');
      const hiddenApiKey = this.keyVisibility.find(KeyContainer).text();
      expect(hiddenApiKey).not.toContain('*');
      expect(hiddenApiKey).toEqual(key);
    });
  });

  it('passes entity name to action buttons', () => {
    const actionButtonColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: ApiKeyModal) => col.key === 'action');
    const entity = {
      id: 1,
      name: 'test',
    };
    const actionButtons = actionButtonColumn.render(entity);
    expect(actionButtons.props.name).toEqual(entity.name);
  });

  it('calls onRemove props when delete action button is called', () => {
    const actionButtonColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: ApiKeyModal) => col.key === 'action');
    const entity = {
      id: 1,
      name: 'test',
    };
    const actionButtons = actionButtonColumn.render(entity);
    actionButtons.props.onRemove();
    expect(onRemoveMock).toBeCalled();
  });
});