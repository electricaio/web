import { SFC } from 'react';
import * as React from 'react';
import { Container, Li, Link } from './navigation.css';

export type TMenuItemProps = {
  to: string;
  isActive?: boolean;
};

export const MenuItem: SFC<TMenuItemProps> = ({ to, children, isActive }) => (
  <Li isActive={isActive}>
    <Link href={`#${to}`} isActive={isActive}>
      {children}
    </Link>
  </Li>
);

export type TNavigationProps = {
  matchUrl: string;
};

export const Navigation: SFC<TNavigationProps> = ({ matchUrl }) => {
  return (
    <Container>
      <MenuItem to={'/'} isActive={matchUrl === '/'}>
        Home
      </MenuItem>
      <MenuItem to={'/api-keys'} isActive={matchUrl === '/api-keys'}>
        Api Keys
      </MenuItem>
      <MenuItem to={'/stl-hub'} isActive={matchUrl === '/stl-hub'}>
        STL Hub
      </MenuItem>
      <MenuItem to={'/monitor'} isActive={matchUrl === '/monitor'}>
        Monitor
      </MenuItem>
      <MenuItem to={'/notifications'} isActive={matchUrl === '/notifications'}>
        Notifications
      </MenuItem>
    </Container>
  );
};
