import { withAuth } from '../util';
import { AuthActionTypes } from '../auth/types';

describe('Util', () => {
  it('dispatches a TOKEN_REQUEST', async () => {
    const mockDispatch = jest.fn(action => {
      action.request();
    });

    await withAuth(mockDispatch, () => Promise.resolve());
    expect(mockDispatch.mock.calls[0][0].type).toEqual(AuthActionTypes.TOKEN_REQUEST);
  });

  it('promise is resolve when request is successful', async () => {
    const goodData = 'success';
    const mockDispatch = jest.fn(action => {
      action.request(goodData);
    });

    const result = await withAuth(mockDispatch, data => Promise.resolve(data));
    expect(result).toEqual(goodData);
  });

  //   it('promise is rejected when request fails', async () => {
  //     const badData = 'fail';
  //     const mockDispatch = jest.fn(action => {
  //       action.request(badData);
  //     });

  //     try {
  //       await withAuth(mockDispatch, data => Promise.reject(data));
  //     } catch (error) {
  //       expect(error).toEqual(badData);
  //     }
  //   });
});
