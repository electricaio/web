import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { UserProfileComponent, ProfileMenu } from '../user-profile';
import { Dropdown, Menu, Icon } from 'antd';
import { StyledIcon } from '../user-profile.css';

describe('UserProfile', () => {
  const name = 'chris';
  beforeEach(() => {
    this.userProfile = mount(<UserProfileComponent logout={jest.fn()} name={name} />);
  });

  it('renders icon for dropdown action', () => {
    const avatar = this.userProfile.find(Dropdown).find(StyledIcon);
    expect(avatar).toHaveLength(1);
    expect(avatar.prop('type')).toEqual('user');
  });

  describe('ProfileMenu', () => {
    const logoutMock = jest.fn();
    beforeEach(() => {
      this.profileMenu = mount(<ProfileMenu name={name} onLogoutUser={logoutMock} />);
    });

    const logoutMenuItem = (): ReactWrapper => {
      return this.profileMenu.find(Menu.Item).findWhere((comp: any) => comp.key() === '.$logout');
    };
    const profileMenuItem = (): ReactWrapper => {
      return this.profileMenu.find(Menu.Item).findWhere((comp: any) => comp.key() === '.$profile');
    };
    const nameMenuItem = (): ReactWrapper => {
      return this.profileMenu.find(Menu.Item).findWhere((comp: any) => comp.key() === '.$name');
    };

    it('renders name at top of menu', () => {
      expect(nameMenuItem().text()).toEqual(name);
    });

    it('renders menu with profile and logout buttons', () => {
      expect(
        logoutMenuItem()
          .find(Icon)
          .prop('type')
      ).toEqual('logout');
      expect(
        profileMenuItem()
          .find(Icon)
          .prop('type')
      ).toEqual('user');
    });
    it('calls logout action when logout button is pressed', () => {
      logoutMenuItem().simulate('click');
      expect(logoutMock).toBeCalled();
    });
  });
});
