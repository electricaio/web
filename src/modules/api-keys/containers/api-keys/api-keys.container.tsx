import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApiKeys } from '../../components/api-keys/api-keys';
import { ApplicationState } from '../../../../redux/store';
import { removeKey, createKey } from '../../../../redux/api-keys/actions';

const mapStateToProps = ({ apiKeys }: ApplicationState) => ({
  apiKeys: apiKeys.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeKey: bindActionCreators(removeKey, dispatch),
  createKey: bindActionCreators(createKey, dispatch),
});

export const ApiKeysContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiKeys);
