import React from 'react';
import { shallow } from 'enzyme';
import { StyledButton } from '../button';

describe('Monitor | monitor Component', () => {
  beforeEach(() => {
    this.component = shallow(<StyledButton />);
  });

  it('renders', () => {
    expect(this.component).toHaveLength(1);
  });
});
