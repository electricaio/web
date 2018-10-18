import React from 'react';
import { shallow } from 'enzyme';
import { match } from 'react-router';
import { Monitor } from '../monitor';

describe('Monitor | monitor Component', () => {
  const match: match = {
    params: {},
    isExact: true,
    path: '/',
    url: '/',
  };

  beforeEach(() => {
    this.component = shallow(<Monitor match={match} />);
  });

  it('renders', () => {
    expect(this.component).toHaveLength(1);
  });
});
