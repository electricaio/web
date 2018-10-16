import React, { SFC } from 'react';
import Layout from '../components/layouts/layout-skewed-background';
import Signup from '../modules/signup';
import { StyledHorizonalCenteredCard } from './pages.css';

const SignupPage: SFC = () => (
  <Layout>
  <StyledHorizonalCenteredCard>
    <Signup />
  </StyledHorizonalCenteredCard>
</Layout>
);

export default SignupPage;