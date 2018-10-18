import React, { SFC } from 'react';
import { match } from 'react-router';
import { MainLayout } from '../../../../components/layouts/main-layout';

type TStlHubProps = {
  match: match;
};

export const StlHub: SFC<TStlHubProps> = ({ match }) => (
  <MainLayout matchUrl={match.url} sidebar={<div>sidebar</div>}>
    <div>STL Hub Module</div>
  </MainLayout>
);
