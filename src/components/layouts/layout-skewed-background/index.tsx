import React, { Fragment, SFC } from 'react';
import { Layout } from 'antd';
import { Background } from './layout-skewed-background.css';

const { Content } = Layout;

export const LayoutSkewedBackground: SFC = ({ children }) => {
  return (
    <Fragment>
      <Background />
      <Layout style={{ height: '100vh' }}>
        <Content>{children}</Content>
      </Layout>
    </Fragment>
  );
};
