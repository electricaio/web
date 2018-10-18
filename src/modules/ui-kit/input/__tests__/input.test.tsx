import React from 'react';
import { shallow } from 'enzyme';
import { StyledInput } from '../input';

describe('Monitor | monitor Component', () => {
  beforeEach(() => {
    this.component = shallow(<StyledInput />);
  });

  it('renders', () => {
    expect(this.component).toHaveLength(1);
  });
});
