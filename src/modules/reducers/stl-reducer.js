import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { createStl } from '../actions/stl-actions';

const initialState = Map({
  loading: true,
  hub: Map(),
});

export default handleActions(
  {
    [createStl]: state => state,
  },
  initialState,
);
