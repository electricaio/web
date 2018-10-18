import { Location } from 'history';
import React from 'react';
import { shallow } from 'enzyme';
import { match } from 'react-router';
import { SidebarNavigation } from '../sidebar';

describe('ApiKeys | sidebar Component', () => {
  const match: match = {
    params: {},
    isExact: true,
    path: '/',
    url: '/',
  };

  const location: Location = {
    pathname: '/',
    search: '',
    state: '',
    hash: '',
  };

  beforeEach(() => {
    this.component = shallow(<SidebarNavigation match={match} location={location} />);
  });

  it('renders', () => {
    expect(this.component).toHaveLength(1);
  });

  it('Has all menu items', () => {
    expect(this.component.children()).toHaveLength(2);
  });

  it('"Api Keys" menu is active', () => {
    expect(this.component.childAt(0).prop('isActive')).toEqual(true);
  });

  it('"Log" menu is inactive', () => {
    expect(this.component.childAt(1).prop('isActive')).toEqual(false);
  });
});
