"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translationReducer = void 0;
var actions = require("store/translation/translation.actions");
var initialState = {
    messages: {}
};
var translationReducer = function (
// eslint-disable-next-line default-param-last
state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions.LOAD_TRANSLATED_MESSAGES:
            return __assign(__assign({}, state), { messages: action.payload });
        default:
            return state;
    }
};
exports.translationReducer = translationReducer;
//# sourceMappingURL=translation.reducer.js.map