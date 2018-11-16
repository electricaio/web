import React, { SFC } from 'react';
import { MainLayoutContainer } from '../components/layouts/main-layout/main-layout';
import { ConntectorHubContainer } from '../modules/connector-hub/containers/connector-hub.container';

export const ConnectorHubLayout: SFC = () => {
  return (
    <MainLayoutContainer>
      <ConntectorHubContainer />
    </MainLayoutContainer>
  );
};
