import React, { SFC } from 'react';
import Layout from '../components/layouts/layout-skewed-background';
import Login from '../modules/login';
import { StyledCard, Centered } from './pages.css';


const SignupPage: SFC = () => (
  <Layout>
  <Centered>
    <StyledCard>
      <Login />
    </StyledCard>
  </Centered>
</Layout>
);

export default SignupPage;