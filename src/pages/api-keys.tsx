import React, { SFC } from 'react';
import { match, Route, Switch } from 'react-router';
import { ApiKeysContainer } from '../modules/api-keys/containers/api-keys/api-keys.container';
import { MainLayout } from '../components/layouts/main-layout';
import { SidebarNavigation } from '../modules/api-keys/components/sidebar/sidebar';

type TApiKeysLayoutProps = {
  match: match;
  location: Location;
};

export const ApiKeysLayout: SFC<TApiKeysLayoutProps> = ({ match, location }) => {
  return (
    <MainLayout
      matchUrl={match.url}
      sidebar={<SidebarNavigation match={match} location={location} />}
    >
      <Switch>
        <Route path={match.url} exact={true} component={ApiKeysContainer} />
        <Route path={`${match.url}/log`} component={() => <div>log</div>} />
      </Switch>
    </MainLayout>
  );
};
