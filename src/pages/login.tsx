import React from 'react';
import Layout from '../components/layouts/layout-skewed-background';
import Login from '../modules/login';
import { StyledCard, Centered } from './pages.css';

export default function loginPage() {
  return (
    <Layout>
      <Centered>
        <StyledCard>
          <Login />
        </StyledCard>
      </Centered>
    </Layout>
  );
}
