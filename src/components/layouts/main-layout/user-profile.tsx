import React, { SFC } from 'react';
import { Avatar, Dropdown, Icon, Menu } from 'antd';
import { Name, Profile } from './user-profile.css';

export type TUserProfileProps = {
  name: string;
  src: string;
};

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="user" />
      Profile
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="logout" />
      Logout
    </Menu.Item>
  </Menu>
);

export const UserProfile: SFC<TUserProfileProps> = ({ name, src }) => (
  <Profile>
    <Name>{name}</Name>
    <Dropdown overlay={menu}>
      <Avatar icon="user" src={src} />
    </Dropdown>
  </Profile>
);
