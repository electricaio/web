import { errorReducer } from '../reducer';
import { ErrorTypes, ErrorsState } from '../types';

const initialState: ErrorsState = {
  message: '',
};

describe('errors reducer', () => {
  describe('create error', () => {
    it('sets data to the payload that is enterign', () => {
        const message = 'error';
      expect(
        errorReducer(initialState, {
          type: ErrorTypes.CREATE_ERROR,
          payload: message,
        })
      ).toEqual({
        ...initialState,
        message,
      });
    });
  });

  describe('reset error', () => {
    it('empties the message data', () => {
      expect(
        errorReducer(initialState, {
          type: ErrorTypes.RESET_ERROR,
          payload: null,
        })
      ).toEqual({
        ...initialState,
        message: '',
      });
    });
  });
});
