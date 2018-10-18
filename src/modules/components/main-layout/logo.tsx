import * as React from 'react';
import { SFC } from 'react';
import { CompanyName, Icon, LogoContainer } from './logo.css';

export type TLogoProps = {
  src: string;
};

export const Logo: SFC<TLogoProps> = ({ src }) => (
  <LogoContainer href="#/">
    <Icon src={src} />
    <CompanyName>electrica.io</CompanyName>
  </LogoContainer>
);
