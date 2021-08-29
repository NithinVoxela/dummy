export interface IEnvironment {
  production: boolean;
  apiEndpoints: {
    frontEndApi: string;
  };
  externalLinks: {
    translationServiceEndpoint: string;
  };
  constants: {};
}
