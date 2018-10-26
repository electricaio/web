import { mount } from 'enzyme';
import React from 'react';
import { ConnectorFilters } from '../filters';
import { StyledButton } from '../../../../ui-kit/button';
import { Switch } from 'antd';
import { DropdownComponent } from '../../../../ui-kit/dropdown';

describe('Filter', () => {
  beforeEach(() => {
    this.filter = mount(<ConnectorFilters />);
  });

  it('has create connector button', () => {
    const btn = this.filter.find(StyledButton);
    expect(btn).toHaveLength(1);
    expect(btn.prop('type')).toEqual('primary');
    expect(btn.prop('icon')).toEqual('plus');
  });

  it('has switch to display active connectors', () => {
    const switchComponent = this.filter.find(Switch);
    expect(switchComponent).toHaveLength(1);
    expect(switchComponent.prop('defaultChecked')).toBeTruthy();
  });

  it('has DropdownComponent ', () => {
    const dropdownComponent = this.filter.find(DropdownComponent);
    expect(dropdownComponent).toHaveLength(1);
  });

  it('has DropdownComponent with true `keepOpen` drop down', () => {
    const dropdownComponent = this.filter.find(DropdownComponent);
    expect(dropdownComponent.prop('keepMenuOpen')).toBeTruthy();
  });
});
