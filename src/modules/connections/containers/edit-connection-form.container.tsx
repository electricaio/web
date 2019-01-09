import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../redux/store';
import { AuthorizationType, ConnectionModal } from '../../../redux/connections/types';
import { fetchAuthorization } from '../../../redux/connections/async';
import { AsyncComponent } from '../../../components/async-component/async-component';
import { ConnectionForm, DefaultFormValues } from '../components/connection-form/connection-form';
import { ConnectorModal } from '../../../redux/connector-hub/types';
import { ApiKeyModal } from '../../../redux/api-keys/types';

const mapStateToProps = ({ connections }: ApplicationState) => ({
  authorizations: connections.authorizations,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAuthorization: bindActionCreators(fetchAuthorization, dispatch),
});

interface PropsFromState {
  authorizations: AuthorizationType[];
}

interface Props {
  connector: ConnectorModal;
  connection: ConnectionModal;
  accessKeys: ApiKeyModal[];
  defaultFormValues?: DefaultFormValues;
  wrappedComponentRef?: any;
}

export interface PropsFromDispatch {
  fetchAuthorization: typeof fetchAuthorization;
}

type AllProps = PropsFromState & PropsFromDispatch & Props;

export class ConnectionFormComponent extends Component<AllProps> {
  render() {
    const {
      authorizations,
      connection,
      fetchAuthorization,
      connector,
      accessKeys,
      wrappedComponentRef,
    } = this.props;
    const asyncActions = () => [
      fetchAuthorization(connection.authorizationId, connector.authorizationType),
    ];

    const authorization = authorizations.find(
      (auth: AuthorizationType) => auth.id === connection.authorizationId
    );

    const properties = Object.keys(connection.properties || {}).map(name => ({
      name,
      value: connection.properties[name],
    }));

    const defaultValues: DefaultFormValues = {
      authorization,
      properties,
      connectionName: connection.name,
      accessKeyId: connection.accessKeyId,
    };

    return (
      <AsyncComponent getAsyncActions={asyncActions} message="Fetching Connection">
        <ConnectionForm
          wrappedComponentRef={wrappedComponentRef}
          defaultFormValues={defaultValues}
          connector={connector}
          accessKeys={accessKeys}
          inEditMode
        />
      </AsyncComponent>
    );
  }
}

export const ConnectionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionFormComponent);
