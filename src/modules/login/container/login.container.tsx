import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { LoginFormComponent } from '../login';
import { ApplicationState } from '../../../redux/store';
import { loginUser } from '../../../redux/user/actions';

const mapStateToProps = ({ user }: ApplicationState) => ({
  user: user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginUser: bindActionCreators(loginUser, dispatch),
});

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);
