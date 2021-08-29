import { IMessages } from "models/message.model";
import { IStoreAction } from "store/action.model";
import * as actions from "store/translation/translation.actions";

export interface ITranslationState {
  messages: IMessages;
}

const initialState: ITranslationState = {
  messages: {}
};

export const translationReducer = (
  // eslint-disable-next-line default-param-last
  state: ITranslationState = initialState,
  action: IStoreAction
): ITranslationState => {
  switch (action.type) {
    case actions.LOAD_TRANSLATED_MESSAGES:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};
