import React from 'react';
import Layout from './layout/layout-sidebar';
import Sidebar from '../modules/api-keys/sidebar';
import Main from '../modules/api-keys/main';

export default function APIKeys() {
  return (
    <Layout sidebar={<Sidebar />}>
      <Main />
    </Layout>
  );
}
