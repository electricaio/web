import { SFC } from 'react';
import * as React from 'react';
import { CompanyName, Icon, LogoContainer } from './logo.css';

export type TLogoProps = {
  src: string;
};

export const Logo: SFC<TLogoProps> = ({ src }) => (
  <LogoContainer>
    <Icon src={src} />
    <CompanyName>electrica.io</CompanyName>
  </LogoContainer>
);
