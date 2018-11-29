import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Dropdown, Icon, Menu } from 'antd';

import { Name, Profile, StyledIcon } from './user-profile.css';
import { logoutUser } from '../../../redux/auth/async';

interface ProfileMenuProps {
  onLogoutUser: typeof logoutUser;
  name: string;
}

export const ProfileMenu: React.SFC<ProfileMenuProps> = ({ onLogoutUser, name }) => {
  return (
    <Menu>
      <Menu.Item key="name">
        <Name>{name}</Name>
      </Menu.Item>
      <Menu.Item key="profile">
        <Icon type="user" />
        Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={onLogoutUser}>
        <Icon type="logout" />
        Logout
      </Menu.Item>
    </Menu>
  );
};

export type UserProfileProps = {
  name?: string;
};

interface PropsFromDispatch {
  logout: typeof logoutUser;
}

type AllProps = UserProfileProps & PropsFromDispatch;

export const UserProfileComponent: SFC<AllProps> = ({ name = 'Chris McCaw', logout }) => (
  <Profile>
    <Dropdown overlay={<ProfileMenu name={name} onLogoutUser={logout} />}>
      <StyledIcon type="user" theme="outlined" />
    </Dropdown>
  </Profile>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: bindActionCreators(logoutUser, dispatch),
});

export const UserProfileContainer = connect(
  null,
  mapDispatchToProps
)(UserProfileComponent);
