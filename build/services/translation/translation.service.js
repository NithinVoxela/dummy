"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translationService = exports.textNotFound = void 0;
var axios_1 = require("axios");
var errorHandlerActions = require("containers/Notifier/store/errorHandler.action");
var configureStore_1 = require("store/configureStore");
var environment_selectors_1 = require("store/environment/environment.selectors");
var translationActions = require("store/translation/translation.actions");
exports.textNotFound = "Text not found";
var TranslationService = /** @class */ (function () {
    function TranslationService() {
        this.loadTranslations = function (store) {
            var state = store.getState();
            var translationServiceEndpoint = environment_selectors_1.getEnvironment(state).externalLinks.translationServiceEndpoint;
            return TranslationService._instance.httpService
                .get(translationServiceEndpoint)
                .then(function (res) {
                store.dispatch(translationActions.loadTranslatedMessages(res.data));
            })
                .catch(function () {
                store.dispatch(errorHandlerActions.handleError(new Error("Unable to load labels")));
            });
        };
        this.getMessageTranslation = function (key, defaultMessage) {
            if (defaultMessage === void 0) { defaultMessage = exports.textNotFound; }
            var tokens = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                tokens[_i - 2] = arguments[_i];
            }
            var appStore = configureStore_1.AppStore.getInstance();
            var messageList = appStore.getState().translation.messages;
            var message = messageList[key] || defaultMessage;
            if (tokens.length) {
                tokens.forEach(function (token, index) {
                    message = message.replace("{" + index.toString() + "}", token);
                });
            }
            return message;
        };
    }
    TranslationService.getInstance = function () {
        if (!TranslationService._instance) {
            TranslationService._instance = new TranslationService();
            TranslationService._instance.httpService = axios_1.default;
        }
        return TranslationService._instance;
    };
    return TranslationService;
}());
exports.translationService = TranslationService.getInstance();
//# sourceMappingURL=translation.service.js.map