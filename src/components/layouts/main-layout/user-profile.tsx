import React, { SFC } from 'react';
import { Avatar, Name, Profile, StyledIcon } from './user-profile.css';

export type TUserProfileProps = {
  name: string;
  src: string;
};

export const UserProfile: SFC<TUserProfileProps> = ({ name, src }) => (
  <Profile>
    <Name>{name}</Name>
    <Avatar src={src} />
    <StyledIcon type="caret-down" theme="outlined" />
  </Profile>
);
