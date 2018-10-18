import React, { SFC } from 'react';
import { LayoutSkewedBackground } from '../components/layouts/layout-skewed-background';
import { SignupFormComponent } from '../modules/signup';
import { StyledHorizonalCenteredCard } from './pages.css';

export const SignupPage: SFC = () => (
  <LayoutSkewedBackground>
    <StyledHorizonalCenteredCard>
      <SignupFormComponent />
    </StyledHorizonalCenteredCard>
  </LayoutSkewedBackground>
);
