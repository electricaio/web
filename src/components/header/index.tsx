import * as React from 'react';
import { SFC } from 'react';
import { StyledHeader, StyledLogo } from './header.css';

export type THeaderProps = {
  title: string;
};

export const Header: SFC<THeaderProps> = ({ title, children }) => (
  <StyledHeader>
    {/*<StyledLogo />*/}
    <h1>{title}</h1>
    {children}
  </StyledHeader>
);
