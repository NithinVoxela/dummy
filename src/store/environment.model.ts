export interface IEnvironment {
  production: boolean;
  externalLinks: {
    translationServiceEndpoint: string;
  };
  intervals: {
    userLogout: number;
    searchInputDebounce: number;
  };
  constants: {};
}
