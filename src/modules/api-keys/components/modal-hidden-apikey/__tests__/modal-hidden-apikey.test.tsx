import { mount } from 'enzyme';
import React from 'react';
import { HiddenAPIKeyModalComponent } from '../modal-hidden-apikey';
import { Modal } from 'antd';
import { ApiKeyModal } from '../../../../../redux/api-keys/types';

describe('New Key Modal', () => {
  const data: ApiKeyModal[] = [
    {
      id: 1,
      name: 'Development',
      key: '123',
      createdAt: '2018-11-20T18:42:08.552',
    },
    {
      id: 2,
      name: 'Staging',
      key: '234',
      createdAt: '2018-10-19T18:42:08.552',
    },
    {
      id: 3,
      name: 'Production',
      key: '345',
      createdAt: '2018-11-15T18:42:08.552',
    },
  ];
  const entity = {
    id: 1,
    name: 'Development',
    key: '123',
    createdAt: '2018-11-20T18:42:08.552',
  };
  const getKeyMock = jest.fn();

  beforeEach(() => {
    this.hiddenKeyComponent = mount(
      <HiddenAPIKeyModalComponent entity={entity} getKey={getKeyMock} apiKeys={data}>
        <span className="clickable">View Key</span>
      </HiddenAPIKeyModalComponent>
    );
  });

  it('hides modal when cancel is called', () => {
    const modal = this.hiddenKeyComponent.find(Modal);
    modal.prop('onCancel')();
    expect(this.hiddenKeyComponent.find(Modal).prop('visible')).toBeFalsy();
  });

  it('adds onClick to child and displays modal when clicked', () => {
    this.hiddenKeyComponent.find('.clickable').simulate('click');
    const modal = this.hiddenKeyComponent.find(Modal);
    expect(modal.prop('visible')).toBeTruthy();
  });
});
