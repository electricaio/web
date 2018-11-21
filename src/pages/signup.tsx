import React, { SFC } from 'react';
import { LayoutSkewedBackground } from '../components/layouts/layout-skewed-background';
import { SignupContainer } from '../modules/signup/container/signup.container';
import { StyledHorizonalCenteredCard } from './pages.css';

export const SignupPage: SFC = () => (
  <LayoutSkewedBackground>
    <StyledHorizonalCenteredCard>
      <SignupContainer />
    </StyledHorizonalCenteredCard>
  </LayoutSkewedBackground>
);
