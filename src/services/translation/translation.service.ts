import axios, { AxiosStatic } from "axios";
import { AnyAction, Store } from "redux";

import * as errorHandlerActions from "containers/Notifier/store/errorHandler.action";
import { AppStore } from "store/configureStore";
import { getEnvironment } from "store/environment/environment.selectors";
import { IApplicationState } from "store/state.model";
import * as translationActions from "store/translation/translation.actions";

import * as messages from "./messages.json";

export const textNotFound = "Text not found";

class TranslationService {
  private static _instance: TranslationService;
  public httpService: AxiosStatic;

  public static getInstance(): TranslationService {
    if (!TranslationService._instance) {
      TranslationService._instance = new TranslationService();
      TranslationService._instance.httpService = axios;
    }

    return TranslationService._instance;
  }

  public loadTranslations = (store: Store<IApplicationState, AnyAction>) => {
    const state = store.getState();
    const { translationServiceEndpoint } = getEnvironment(state).externalLinks;
    return TranslationService._instance.httpService
      .get(translationServiceEndpoint)
      .then(res => {
        store.dispatch(translationActions.loadTranslatedMessages(res.data));
      })
      .catch(() => {
        store.dispatch(errorHandlerActions.handleError(new Error("Unable to load labels")));
      });
  };

  public getMessageTranslation = (
    key: keyof typeof messages,
    defaultMessage: string = textNotFound,
    ...tokens: any[]
  ): string => {
    const appStore = AppStore.getInstance();
    const messageList = appStore.getState().translation.messages;
    let message = messageList[key] || defaultMessage;
    if (tokens.length) {
      tokens.forEach((token, index) => {
        message = message.replace(`{${index.toString()}}`, token);
      });
    }
    return message;
  };
}

export const translationService = TranslationService.getInstance();
