import { IApplicationState } from "store/state.model";

export const getTranslatedMessages = (state: IApplicationState) => state.translation.messages;
