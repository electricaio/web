import React from 'react';
import { shallow } from 'enzyme';
import { match } from 'react-router';
import { StlHub } from '../stl-hub';

describe('STL Hub | stl-hub Component', () => {
  const match: match = {
    params: {},
    isExact: true,
    path: '/',
    url: '/',
  };

  beforeEach(() => {
    this.component = shallow(<StlHub match={match} />);
  });

  it('renders', () => {
    expect(this.component).toHaveLength(1);
  });
});
