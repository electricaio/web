import React from 'react';
import { shallow } from 'enzyme';
import { match } from 'react-router';
import { Home } from '../home';

describe('Home | home Component', () => {
  const match: match = {
    params: {},
    isExact: true,
    path: '/',
    url: '/',
  };

  beforeEach(() => {
    this.component = shallow(<Home match={match} />);
  });

  it('renders', () => {
    expect(this.component).toHaveLength(1);
  });
});
