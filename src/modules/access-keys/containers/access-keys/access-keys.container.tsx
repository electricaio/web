import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AccessKeys } from '../../components/access-keys/access-keys';
import { ApplicationState } from '../../../../redux/store';
import { AccessKeyModal } from '../../../../redux/access-keys/types';
import { removeKey, createKey, refreshKey, fetchKeys } from '../../../../redux/access-keys/async';
import { AsyncComponent } from '../../../../components/async-component/async-component';

const mapStateToProps = ({ accessKeys, auth }: ApplicationState) => ({
  accessKeys: accessKeys.data,
  userId: auth.user.id,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeKey: bindActionCreators(removeKey, dispatch),
  fetchKeys: bindActionCreators(fetchKeys, dispatch),
  createKey: bindActionCreators(createKey, dispatch),
  refreshKey: bindActionCreators(refreshKey, dispatch),
});

interface PropsFromState {
  accessKeys: AccessKeyModal[];
  userId: number;
}

interface PropsFromDispatch {
  removeKey: typeof removeKey;
  createKey: typeof createKey;
  fetchKeys: typeof fetchKeys;
  refreshKey: typeof refreshKey;
}

type AllProps = PropsFromState & PropsFromDispatch;

export class AccessKeysComponent extends Component<AllProps> {
  render() {
    const { removeKey, createKey, refreshKey, accessKeys, userId, fetchKeys } = this.props;
    return (
      <AsyncComponent
        message="Fetching your access keys"
        getAsyncActions={() => [fetchKeys(userId)]}
      >
        <AccessKeys
          removeKey={removeKey}
          createKey={createKey}
          refreshKey={refreshKey}
          accessKeys={accessKeys}
          userId={userId}
        />
      </AsyncComponent>
    );
  }
}

export const AccessKeysContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccessKeysComponent);
