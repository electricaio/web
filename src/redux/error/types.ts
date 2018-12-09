export const enum ErrorTypes {
  CREATE_ERROR = '@@error/create',
  RESET_ERROR = '@@error/reset',
}

export interface ErrorsState {
  readonly message: string;
}
