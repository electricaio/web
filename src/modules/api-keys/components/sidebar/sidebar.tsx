import React, { SFC } from 'react';
import { match } from 'react-router';
import { Li, Ul, StyledIcon, Link } from './sidebar.css';

export type TSidebarNavigationProps = {
  match: match;
  location: Location;
};

export const SidebarNavigation: SFC<TSidebarNavigationProps> = ({ match, location }) => (
  <Ul>
    <MenuItem to={`#${match.url}`} isActive={match.url === location.pathname}>
      <StyledIcon type="key" theme="outlined" />
      API Keys
    </MenuItem>
    <MenuItem to={`#${match.url}/log`} isActive={`${match.url}/log` === location.pathname}>
      <StyledIcon type="file-text" theme="outlined" />
      Log
    </MenuItem>
  </Ul>
);

export type TMenuItemProps = {
  to: string;
  isActive?: boolean;
};

export const MenuItem: SFC<TMenuItemProps> = ({ to, isActive, children }) => {
  return (
    <Li isActive={isActive}>
      <Link isActive={isActive} href={to}>
        {children}
      </Link>
    </Li>
  );
};
