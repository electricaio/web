import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { DropdownComponent } from '../dropdown';
import { Dropdown, Button, Icon } from 'antd';

describe('DropdownComponent', () => {
  const label = 'test';

  beforeEach(() => {
    this.dropdown = mount(<DropdownComponent label={label} keepMenuOpen />);
  });

  const findAndOpenMenu = () => {
    const menu = new ReactWrapper(this.dropdown.find(Dropdown).props().overlay, true as any);
    // @ts-ignore
    menu.props().onClick();
  };

  it('has Dropdown with button', () => {
    const button = this.dropdown.find(Dropdown).find(Button);
    expect(button).toHaveLength(1);
  });

  it('has large dropdown button', () => {
    const button = this.dropdown.find(Dropdown).find(Button);
    expect(button.prop('size')).toEqual('large');
  });

  it('should render button with a label and down icon', () => {
    const button = this.dropdown.find(Dropdown).find(Button);
    expect(button.text()).toEqual(label);
    expect(button.contains(<Icon type="down" />)).toBeTruthy();
  });

  it('keeps menu open when an item is selected', () => {
    this.dropdown.find(Dropdown).prop('onVisibleChange')(true);
    findAndOpenMenu();
    expect(this.dropdown.state().visible).toBeTruthy();
  });

  describe('keepMenuOpen is false', () => {
    beforeEach(() => {
      this.dropdown = mount(<DropdownComponent label={label} keepMenuOpen={false} />);
    });

    it('closes menu open when an item is selected', () => {
      this.dropdown.find(Dropdown).prop('onVisibleChange')(true);
      expect(this.dropdown.state().visible).toBeTruthy();
      findAndOpenMenu();
      expect(this.dropdown.state().visible).toBeFalsy();
    });
  });
});
