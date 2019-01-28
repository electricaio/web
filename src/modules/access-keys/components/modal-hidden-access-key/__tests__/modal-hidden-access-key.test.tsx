import { mount } from 'enzyme';
import React from 'react';
import { HiddenAccessKeyModalComponent } from '../modal-hidden-access-key';
import { Modal } from 'antd';

describe('New Key Modal', () => {
  const entity = {
    id: 1,
    name: 'Development',
    key: '123',
    createdAt: '2018-11-20T18:42:08.552',
  };
  const getKeyMock = jest.fn();

  beforeEach(() => {
    this.hiddenKeyComponent = mount(
      <HiddenAccessKeyModalComponent entity={entity} getKey={getKeyMock} hiddenApiKey={'123'}>
        <span className="clickable">View Key</span>
      </HiddenAccessKeyModalComponent>
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
