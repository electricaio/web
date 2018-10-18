import * as React from 'react';
import { LoginFormComponent } from '../modules/login';
import { SFC } from 'react';
import { LayoutSkewedBackground } from '../components/layouts/layout-skewed-background';
import { StyledCard, Centered } from './pages.css';

export const LoginPage: SFC = () => (
  <LayoutSkewedBackground>
    <Centered>
      <StyledCard>
        <LoginFormComponent />
      </StyledCard>
    </Centered>
  </LayoutSkewedBackground>
);
