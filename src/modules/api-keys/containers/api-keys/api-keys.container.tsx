import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { TAction } from '../../../../redux/actions';
import { refreshKeyAC, removeKeyAC } from '../../../../redux/actions/api-keys';
import { TAppState } from '../../../../redux/store';
import { ApiKeys } from '../../components/api-keys/api-keys';

const mapStateToProps = (state: TAppState) => ({
  data: state.apiKeys,
});

const mapDispatchToProps = (dispatch: Dispatch<TAction>) => ({
  onRemove: bindActionCreators(removeKeyAC, dispatch),
  onRefresh: bindActionCreators(refreshKeyAC, dispatch),
});

export const ApiKeysContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiKeys);
