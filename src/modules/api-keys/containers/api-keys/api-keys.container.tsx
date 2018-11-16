import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApiKeys } from '../../components/api-keys/api-keys';
import { ApplicationState } from '../../../../redux/store';
import { removeKey, createKey, fetchKeys } from '../../../../redux/api-keys/actions';
import { ApiKeyModal } from '../../../../redux/api-keys/types';

const mapStateToProps = ({ apiKeys, auth }: ApplicationState) => ({
  apiKeys: apiKeys.data,
  userId: auth.user.id,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeKey: bindActionCreators(removeKey, dispatch),
  fetchKeys: bindActionCreators(fetchKeys, dispatch),
  createKey: bindActionCreators(createKey, dispatch),
});

interface PropsFromState {
  apiKeys: ApiKeyModal[];
  userId: number;
}

interface PropsFromDispatch {
  removeKey: typeof removeKey;
  createKey: typeof createKey;
  fetchKeys: typeof fetchKeys;
}

type AllProps = PropsFromState & PropsFromDispatch;

class ApiKeysComonent extends Component<AllProps> {
  componentDidMount = () => {
    this.props.fetchKeys(this.props.userId);
  };

  render() {
    const { removeKey, createKey, apiKeys } = this.props;
    return <ApiKeys removeKey={removeKey} createKey={createKey} apiKeys={apiKeys} />;
  }
}

export const ApiKeysContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiKeysComonent);
