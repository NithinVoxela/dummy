export interface IStoreAction {
  type: string;
  payload?: any;
  options?: IActionOptions;
}

export interface IActionOptions {
  withDebounce?: boolean;
}

export type StoreAction<K, V = void> = V extends void ? { type: K } : { type: K } & V;

export interface ISagaAction<K = undefined, V = undefined> {
  type?: string;
  payload?: K;
  options?: V;
}

export enum ErrorValues {
  error = "Error"
}
