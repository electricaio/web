import React, { Fragment } from 'react';
import Table from './table';

import { StyledCard } from './main.css';

export default function APIKeys() {
  return (
    <Fragment>
      <StyledCard>
        These API Keys grant developers the ability to access electrica services in the Cloud. Keep
        them confidential
      </StyledCard>
      <Table />
    </Fragment>
  );
}
