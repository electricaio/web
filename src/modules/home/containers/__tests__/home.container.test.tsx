import React from 'react';
import { mount } from 'enzyme';
import { Home } from '../../components/home/home';
import { HomeComponent } from '../home.container';

describe('Home Container', () => {
  const userName: string = 'Hello World';

  beforeEach(() => {
    this.container = mount(<HomeComponent userName={userName} />);
  });

  it('renders home module', () => {
    expect(this.container.find(Home)).toHaveLength(1);
  });
});
