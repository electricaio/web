import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { getUser } from '../actions/user-actions';

const initialState = Map({
  loading: true,
  user: Map(),
});

export default handleActions(
  {
    [getUser]: state => state,
  },
  initialState,
);
