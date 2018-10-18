import { shallow } from 'enzyme';
import React from 'react';
import { Logo } from '../logo';
import { CompanyName, Icon } from '../logo.css';

describe('Main Layout | Logo Component', () => {
  beforeEach(() => {
    this.component = shallow(<Logo />);
  });

  it('renders', () => {
    expect(this.component).toHaveLength(1);
  });

  it('have icon', () => {
    expect(this.component.find(Icon)).toHaveLength(1);
  });

  it('have company name', () => {
    expect(this.component.find(CompanyName)).toHaveLength(1);
  });
});
