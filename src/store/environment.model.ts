export interface IEnvironment {
  production: boolean;
  apiEndpoints: {
    frontEndApi: string;
  };
  externalLinks: {
    translationServiceEndpoint: string;
  };
  intervals: {
    userLogout: number;
  };
  constants: {};
  authenticationHeaders: {
    tenantId: string;
  };
}
