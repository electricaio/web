import React, { SFC } from 'react';
import { ApiKeysContainer } from '../modules/api-keys/containers/api-keys/api-keys.container';
import { MainLayoutContainer } from '../components/layouts/main-layout/main-layout';

export const ApiKeysLayout: SFC = () => {
  return (
    <MainLayoutContainer>
      <ApiKeysContainer />
    </MainLayoutContainer>
  );
};
