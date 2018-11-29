import { mount } from 'enzyme';
import React from 'react';
import { Home } from '../home';

describe('Home', () => {
  const userName = 'Hello World';

  beforeEach(() => {
    this.component = mount(<Home userName={userName} />);
  });

  it('renders home', () => {
    expect(this.component).toHaveLength(1);
  });
});
