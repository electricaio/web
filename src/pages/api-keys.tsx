import { Location } from 'history';
import React, { SFC } from 'react';
import { match, Route, Switch } from 'react-router';
import { ApiKeysContainer } from '../modules/api-keys/containers/api-keys/api-keys.container';
import { MainLayout } from '../components/layouts/main-layout';

type TApiKeysLayoutProps = {
  match: match;
  location: Location;
};

export const ApiKeysLayout: SFC<TApiKeysLayoutProps> = ({ match }) => {
  return (
    <MainLayout matchUrl={match.url}>
      <Switch>
        <Route path={match.url} exact component={ApiKeysContainer} />
        <Route path={`${match.url}/log`} component={() => <div>log</div>} />
      </Switch>
    </MainLayout>
  );
};
