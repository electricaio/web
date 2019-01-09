export const isTokenAuthorizationType = (authorizationType: string) => {
  return authorizationType.toLowerCase() === 'token';
};

export const isBasicAuthorizationType = (authorizationType: string) => {
  return authorizationType.toLowerCase() === 'basic';
};

export const hasNoAuthorizationType = (authorizationType: string) => {
  return authorizationType.toLowerCase() === 'none';
};
