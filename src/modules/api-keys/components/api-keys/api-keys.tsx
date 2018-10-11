import * as React from 'react';
import { StyledCard } from './theme/api-keys.css';
import { ApiKeysTable } from '../table/table';
import { Fragment } from 'react';

// export const ApiKeys2 = () => <div>Api Keys component!</div>;

export const ApiKeys = () => (
  <Fragment>
    <StyledCard>
      These API Keys grant developers the ability to access electrica services in the Cloud. Keep
      them confidential
    </StyledCard>
    <ApiKeysTable />
  </Fragment>
);
