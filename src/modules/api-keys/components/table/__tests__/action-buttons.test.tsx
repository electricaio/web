import { shallow } from 'enzyme';
import React from 'react';
import { Tooltip, Icon, Popconfirm } from 'antd';

import { ActionButtons } from '../action-buttons';
import { ButtonActionModal } from '../../modal-button-action/modal-button-action';

describe('Action Buttons', () => {
  const onRemoveMock = jest.fn();
  const onEditMock = jest.fn();
  const name = 'test name';
  const apiKey = 'test key';

  beforeEach(() => {
    this.component = shallow(
      <ActionButtons apiKey={apiKey} name={name} onEdit={onEditMock} onRemove={onRemoveMock} />
    );
  });

  it('shows edit icon with hint text', () => {
    const tooltip = this.component.find(Tooltip);
    const icon = tooltip.find(Icon);
    expect(tooltip.prop('placement')).toEqual('top');
    expect(icon.prop('type')).toEqual('edit');
  });

  it('Renders a popconfirm component with a delete icon', () => {
    const popconfirm = this.component.find(Popconfirm);
    expect(popconfirm.prop('placement')).toEqual('top');
    expect(popconfirm.prop('okText')).toEqual('Yes');
    expect(popconfirm.prop('cancelText')).toEqual('No');
    expect(popconfirm.contains(<Icon type="delete" />)).toBeTruthy();
  });

  it('popconfirm calls onRemove prop when accepted', () => {
    const popconfirm = this.component.find(Popconfirm);
    expect(popconfirm.prop('onConfirm')).toEqual(onRemoveMock);
  });

  it('action button modal contains edit properties', () => {
    const buttonActionModal = this.component.find(ButtonActionModal);
    expect(buttonActionModal.prop('title')).toEqual('Edit API Key');
    expect(buttonActionModal.prop('submitText')).toEqual('Save');
    expect(buttonActionModal.prop('apiKey')).toEqual(apiKey);
    expect(buttonActionModal.prop('name')).toEqual(name);
    expect(buttonActionModal.prop('onCommit')).toEqual(onEditMock);
  });

  it('edit icon is a child of action button modal', () => {
    const buttonActionModal = this.component.find(ButtonActionModal);
    expect(buttonActionModal.find(Icon)).toHaveLength(1);
  });
});
