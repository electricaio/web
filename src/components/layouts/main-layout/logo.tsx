import React, { SFC } from 'react';
import { CompanyName, Icon, LogoContainer } from './logo.css';
import logo from './../../../assets/logo.svg';

export const Logo: SFC = () => (
  <LogoContainer href="#/">
    <Icon src={logo} />
    <CompanyName>electrica.io</CompanyName>
  </LogoContainer>
);
