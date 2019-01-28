import React from 'react';
import { mount, shallow } from 'enzyme';
import { ConnectionForm, SelectAccessKeys } from '../connection-form';
import { ConnectorModal } from '../../../../../redux/api-hub/types';
import { ApiKeyModal } from '../../../../../redux/api-keys/types';
import { Select } from 'antd';

describe('ConnectionForm', () => {
  const connector: ConnectorModal = {
    typeId: 1,
    authorizationType: 'None',
    name: 'SalesForce CRM API 2.0',
    resource: 'customer',
    version: '2.0',
    namespace: 'salesforce',
    properties: {
      url: 'https://www.salesforce.com',
      sdk_url: 'url_to_sdk',
      image_url: 'string',
      description: 'This connector allows you to connect to SalesForce CRM system.',
    },
    id: 4,
    ern: 'ern://salesforce:customer:2_0',
    revisionVersion: 0,
  };

  const accessKeys: ApiKeyModal[] = [
    {
      id: 1,
      name: 'access keys',
      key: 'Development',
      createdAt: '',
    },
  ];

  beforeEach(() => {
    this.connectionForm = mount(<ConnectionForm accessKeys={accessKeys} connector={connector} />);
  });

  it('should have a name input', () => {
    const name = this.connectionForm.find('input#connectionName');
    expect(name).toHaveLength(1);
  });

  it('renders access key select', () => {
    const select = this.connectionForm.find(SelectAccessKeys);
    expect(select).toHaveLength(1);
  });

  describe('editMode', () => {
    beforeEach(() => {
      this.editModeConnectionForm = mount(
        <ConnectionForm accessKeys={accessKeys} connector={connector} inEditMode />
      );
    });

    it('does not show access keys component if in edit mode', () => {
      const accessKeysComponent = this.connectionForm.find('input#accessKeyId');
      expect(accessKeysComponent).toHaveLength(0);
    });
  });

  describe('SelectAccessKeys', () => {
    it('render select with options', () => {
      const selectAccessKeysComponent = shallow(<SelectAccessKeys accessKeys={accessKeys} />);
      const accessKey = selectAccessKeysComponent.find(Select.Option).first();
      expect(selectAccessKeysComponent.find(Select.Option)).toHaveLength(accessKeys.length);
      expect(accessKey.prop('value')).toEqual(accessKeys[0].id);
      expect(accessKey.prop('children')).toEqual(accessKeys[0].name);
    });
  });
});
