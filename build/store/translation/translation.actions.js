"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTranslatedMessages = exports.LOAD_TRANSLATED_MESSAGES = void 0;
exports.LOAD_TRANSLATED_MESSAGES = "[TRANSLATION] LOAD_TRANSLATED_MESSAGES";
var loadTranslatedMessages = function (messages) { return ({
    type: exports.LOAD_TRANSLATED_MESSAGES,
    payload: messages
}); };
exports.loadTranslatedMessages = loadTranslatedMessages;
//# sourceMappingURL=translation.actions.js.map