import React, { SFC } from 'react';
import { MainLayout } from '../components/layouts/main-layout';
import { ConntectorHubContainer } from '../modules/connector-hub/containers/connector-hub.container';

export const ConnectorHubLayout: SFC = () => {
  return (
    <MainLayout>
      <ConntectorHubContainer />
    </MainLayout>
  );
};
