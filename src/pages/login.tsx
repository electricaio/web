import { LoginContainer } from '../modules/login/container/login.container';
import React, { SFC } from 'react';
import { LayoutSkewedBackground } from '../components/layouts/layout-skewed-background';
import { StyledCard, Centered } from './pages.css';

export const LoginPage: SFC = () => (
  <LayoutSkewedBackground>
    <Centered>
      <StyledCard>
        <LoginContainer />
      </StyledCard>
    </Centered>
  </LayoutSkewedBackground>
);
