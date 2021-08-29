import { IMessages } from "models/message.model";

export const LOAD_TRANSLATED_MESSAGES = "[TRANSLATION] LOAD_TRANSLATED_MESSAGES";

export const loadTranslatedMessages = (messages: IMessages) => ({
  type: LOAD_TRANSLATED_MESSAGES,
  payload: messages
});
