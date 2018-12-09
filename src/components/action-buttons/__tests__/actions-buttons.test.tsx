import { shallow } from 'enzyme';
import React from 'react';
import { Tooltip, Icon, Popconfirm } from 'antd';

import { ActionButtons } from '../action-buttons';

describe('Action Buttons', () => {
  const onRemoveMock = jest.fn();
  const onEditMock = jest.fn();
  const name = 'test name';

  beforeEach(() => {
    this.component = shallow(
      <ActionButtons name={name} onEdit={onEditMock} onRemove={onRemoveMock} />
    );
  });

  it('shows edit icon with hint text', () => {
    const tooltip = this.component.find(Tooltip).at(0);
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
});
