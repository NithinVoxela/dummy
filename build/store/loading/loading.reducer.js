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
exports.loadingReducer = void 0;
var actions = require("./loading.actions");
var initialState = {
    requestCount: 0
};
var loadingReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action === void 0) { action = {}; }
    switch (action.type) {
        case actions.SHOW_LOADING:
            return __assign(__assign({}, state), { requestCount: state.requestCount + 1 });
        case actions.HIDE_LOADING:
            return __assign(__assign({}, state), { requestCount: state.requestCount > 0 ? state.requestCount - 1 : 0 });
        default:
            return state;
    }
};
exports.loadingReducer = loadingReducer;
//# sourceMappingURL=loading.reducer.js.map