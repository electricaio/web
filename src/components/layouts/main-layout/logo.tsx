import React, { SFC } from 'react';
import { Icon, LogoContainer } from './logo.css';

export type TLogoProps = {
  src: string;
};

export const Logo: SFC<TLogoProps> = ({ src }) => (
  <LogoContainer href="#/">
    <Icon src={src} />
  </LogoContainer>
);
