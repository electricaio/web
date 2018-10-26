import React from 'react';
import { mount } from 'enzyme';
import { Navigation } from '../navigation';
import { Menu } from 'antd';
import { MemoryRouter } from 'react-router-dom';

describe('Navigation', () => {
  beforeEach(() => {
    this.navigation = mount(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
  });

  it('renders a horizontal navigation bar', () => {
    expect(this.navigation.find(Menu).prop('mode')).toEqual('horizontal');
  });

  it('contains Menu Items', () => {
    expect(this.navigation.find(Menu.Item).length).toBeGreaterThan(1);
  });
});
