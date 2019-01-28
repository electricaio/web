import { shallow } from 'enzyme';
import React from 'react';
import { Icon, Popconfirm } from 'antd';

import { ActionButtons } from '../action-buttons';

describe('Action Buttons', () => {
  const onRemoveMock = jest.fn();
  const onRefreshMock = jest.fn();
  const name = 'test name';

  beforeEach(() => {
    this.component = shallow(
      <ActionButtons name={name} onRefresh={onRefreshMock} onRemove={onRemoveMock} />
    );
  });

  it('Renders a popconfirm component with a refresh icon', () => {
    const tooltip = this.component.find('[data-test="tooltip1"]');
    const popconfirm = tooltip.find(Popconfirm);
    expect(popconfirm.prop('placement')).toEqual('top');
    expect(popconfirm.prop('okText')).toEqual('Yes');
    expect(popconfirm.prop('cancelText')).toEqual('No');
    expect(popconfirm.contains(<Icon type="sync" />)).toBeTruthy();
  });

  it('Renders a popconfirm component with a delete icon', () => {
    const tooltip = this.component.find('[data-test="tooltip2"]');
    const popconfirm = tooltip.find(Popconfirm);
    expect(popconfirm.prop('placement')).toEqual('top');
    expect(popconfirm.prop('okText')).toEqual('Yes');
    expect(popconfirm.prop('cancelText')).toEqual('No');
    expect(popconfirm.contains(<Icon type="delete" />)).toBeTruthy();
  });

  it('popconfirm calls onRemove prop when accepted', () => {
    const popconfirm = this.component.find('[data-test="tooltip2"]').find(Popconfirm);
    expect(popconfirm.prop('onConfirm')).toEqual(onRemoveMock);
  });

  it('popconfirm calls onRefresh prop when accepted', () => {
    const popconfirm = this.component.find('[data-test="tooltip1"]').find(Popconfirm);
    expect(popconfirm.prop('onConfirm')).toEqual(onRefreshMock);
  });
});
