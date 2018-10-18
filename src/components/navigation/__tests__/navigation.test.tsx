import { shallow } from 'enzyme';
import React from 'react';
import { Navigation } from '../navigation';

describe('Components | navigation Component', () => {
  beforeEach(() => {
    this.component = shallow(<Navigation matchUrl={'/'} />);
  });

  it('renders', () => {
    expect(this.component).toHaveLength(1);
  });

  it('has all menu items', () => {
    expect(this.component.children()).toHaveLength(5);
  });

  it('"Home" is active', () => {
    expect(this.component.childAt(0).prop('isActive')).toEqual(true);
  });

  it('"Api Keys" is active', () => {
    expect(
      this.component
        .setProps({ matchUrl: '/api-keys' })
        .childAt(1)
        .prop('isActive')
    ).toEqual(true);
  });
  it('"STL Hub" is active', () => {
    expect(
      this.component
        .setProps({ matchUrl: '/stl-hub' })
        .childAt(2)
        .prop('isActive')
    ).toEqual(true);
  });
  it('"Monitor" is active', () => {
    expect(
      this.component
        .setProps({ matchUrl: '/monitor' })
        .childAt(3)
        .prop('isActive')
    ).toEqual(true);
  });
  it('"Notifications" is active', () => {
    expect(
      this.component
        .setProps({ matchUrl: '/notifications' })
        .childAt(4)
        .prop('isActive')
    ).toEqual(true);
  });
});
