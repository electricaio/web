import { shallow } from 'enzyme';
import React from 'react';
import { UserProfile } from '../user-profile';
import { Avatar, Name, StyledIcon } from '../user-profile.css';

describe('Main Layout | user-profile Component ', () => {
  beforeEach(() => {
    this.component = shallow(<UserProfile src={''} name={''} />);
  });

  it('renders', () => {
    expect(this.component).toHaveLength(1);
  });

  it('has Name', () => {
    expect(this.component.find(Name)).toHaveLength(1);
  });

  it('has Avatar', () => {
    expect(this.component.find(Avatar)).toHaveLength(1);
  });

  it('has arrow', () => {
    expect(this.component.find(StyledIcon)).toHaveLength(1);
  });
});
