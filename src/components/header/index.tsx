import * as React from 'react';
import { SFC } from 'react';
import { StyledHeader, StyledLogo } from './header.css';
import * as logo from './../../assets/electrica-logo.svg';

export type THeaderProps = {
  title: string;
};

export const Header: SFC<THeaderProps> = ({ title, children }) => (
  <StyledHeader>
    <StyledLogo src={logo} />
    <h1>{title}</h1>
    {children}
  </StyledHeader>
);
