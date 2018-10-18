import React from 'react';
import { shallow } from 'enzyme';
import { match } from 'react-router';
import { Notifications } from '../notifications';

describe('Notifications | notifications Component', () => {
  const match: match = {
    params: {},
    isExact: true,
    path: '/',
    url: '/',
  };

  beforeEach(() => {
    this.component = shallow(<Notifications match={match} />);
  });

  it('renders', () => {
    expect(this.component).toHaveLength(1);
  });
});
