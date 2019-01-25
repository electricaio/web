import { BASIC_AUTH, TOKEN_AUTH, IBM_AUTH } from './auth_types';

export const getAuthPayload = (authorizationType: string, formValues: any): any => {
  switch (authorizationType.toLowerCase()) {
    case BASIC_AUTH:
      return {
        password: formValues.password,
        username: formValues.username,
      };
    case TOKEN_AUTH:
      return {
        token: formValues.token,
      };
    case IBM_AUTH:
      return {
        clientId: formValues.clientId,
        integrationId: formValues.integrationId,
      };
    default:
      return {};
  }
  return {};
};
