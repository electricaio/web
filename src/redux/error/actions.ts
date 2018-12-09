import { createAction } from 'typesafe-actions';
import { ErrorTypes } from './types';

export const createError = createAction(ErrorTypes.CREATE_ERROR, resolve => {
  return (message: string) => resolve(message);
});

export const resetError = createAction(ErrorTypes.RESET_ERROR);
