import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApiKeys } from '../../components/api-keys/api-keys';
import { ApplicationState } from '../../../../redux/store';
import {
  removeKey,
  createKey,
  fetchKeys,
  refreshKey,
  getKey,
} from '../../../../redux/api-keys/actions';
import { ApiKeyModal, ApiHiddenKeyModal } from '../../../../redux/api-keys/types';

const mapStateToProps = ({ apiKeys, auth }: ApplicationState) => ({
  apiKeys: apiKeys.data,
  hiddenKey: apiKeys.hiddenKey,
  userId: auth.user.id,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeKey: bindActionCreators(removeKey, dispatch),
  fetchKeys: bindActionCreators(fetchKeys, dispatch),
  createKey: bindActionCreators(createKey, dispatch),
  refreshKey: bindActionCreators(refreshKey, dispatch),
  getKey: bindActionCreators(getKey, dispatch),
});

interface PropsFromState {
  apiKeys: ApiKeyModal[];
  hiddenKey: ApiHiddenKeyModal;
  userId: number;
}

interface PropsFromDispatch {
  removeKey: typeof removeKey;
  createKey: typeof createKey;
  fetchKeys: typeof fetchKeys;
  refreshKey: typeof refreshKey;
  getKey: typeof getKey;
}

type AllProps = PropsFromState & PropsFromDispatch;

export class ApiKeysComponent extends Component<AllProps> {
  componentDidMount = () => {
    this.props.fetchKeys(this.props.userId);
  };

  render() {
    const { removeKey, createKey, refreshKey, getKey, apiKeys, hiddenKey, userId } = this.props;
    return (
      <ApiKeys
        removeKey={removeKey}
        createKey={createKey}
        refreshKey={refreshKey}
        getKey={getKey}
        apiKeys={apiKeys}
        hiddenKey={hiddenKey}
        userId={userId}
      />
    );
  }
}

export const ApiKeysContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiKeysComponent);
