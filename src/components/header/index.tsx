import React, { SFC } from 'react';
import { Header, StyledLogo } from './header.css';

export type THeaderProps = {
  title: string;
};

const header: SFC<THeaderProps> = ({ title, children }) => (
  <Header>
    <StyledLogo />
    <h1>{title}</h1>
    {children}
  </Header>
);

export default header;
