import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApiKeys } from '../../components/api-keys/api-keys';
import { ApplicationState } from '../../../../redux/store';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { removeKey, createKey, refreshKey, fetchKeys } from '../../../../redux/api-keys/async';
import { AsyncComponent } from '../../../../components/async-component/async-component';

const mapStateToProps = ({ apiKeys, auth }: ApplicationState) => ({
  apiKeys: apiKeys.data,
  userId: auth.user.id,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeKey: bindActionCreators(removeKey, dispatch),
  fetchKeys: bindActionCreators(fetchKeys, dispatch),
  createKey: bindActionCreators(createKey, dispatch),
  refreshKey: bindActionCreators(refreshKey, dispatch),
});

interface PropsFromState {
  apiKeys: ApiKeyModal[];
  userId: number;
}

interface PropsFromDispatch {
  removeKey: typeof removeKey;
  createKey: typeof createKey;
  fetchKeys: typeof fetchKeys;
  refreshKey: typeof refreshKey;
}

type AllProps = PropsFromState & PropsFromDispatch;

export class ApiKeysComponent extends Component<AllProps> {
  render() {
    const { removeKey, createKey, refreshKey, apiKeys, userId, fetchKeys } = this.props;
    return (
      <AsyncComponent
        message="Fetching your access keys"
        getAsyncActions={() => [fetchKeys(userId)]}
      >
        <ApiKeys
          removeKey={removeKey}
          createKey={createKey}
          refreshKey={refreshKey}
          apiKeys={apiKeys}
          userId={userId}
        />
      </AsyncComponent>
    );
  }
}

export const ApiKeysContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiKeysComponent);
