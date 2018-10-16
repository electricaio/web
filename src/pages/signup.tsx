import React from 'react';
import Layout from '../components/layouts/layout-skewed-background';
import Signup from '../modules/signup';
import { StyledHorizonalCenteredCard } from './pages.css';

export default function signup() {
  return (
    <Layout>
      <StyledHorizonalCenteredCard>
        <Signup />
      </StyledHorizonalCenteredCard>
    </Layout>
  );
}
