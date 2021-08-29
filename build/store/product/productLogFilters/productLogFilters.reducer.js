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
exports.productFilterReducer = void 0;
var actions = require("./productLogFilters.actions");
var initialState = {
    keywords: "",
    limit: 0,
    offset: 0,
    sortBy: null,
    sortOrder: "ASC"
};
var productFilterReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action === void 0) { action = {}; }
    switch (action.type) {
        case actions.UPDATE_PRODUCT_LOG_FILTERS:
            return __assign(__assign({}, state), action.payload);
        default:
            return state;
    }
};
exports.productFilterReducer = productFilterReducer;
//# sourceMappingURL=productLogFilters.reducer.js.map