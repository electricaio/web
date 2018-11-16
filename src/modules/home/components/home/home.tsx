import React, { SFC } from 'react';
import { match } from 'react-router';
import { MainLayoutContainer } from '../../../../components/layouts/main-layout/main-layout';

type THomeProps = {
  match: match;
};

export const Home: SFC<THomeProps> = ({ match }) => (
  <MainLayoutContainer>
    <div>Home Module</div>
  </MainLayoutContainer>
);
