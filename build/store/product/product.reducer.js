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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productReducer = void 0;
var actions = require("./product.actions");
var initialState = {
    productLog: { products: [], totalCount: 0 }
};
var productReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action === void 0) { action = {}; }
    switch (action.type) {
        case actions.GET_PRODUCT_LOG_SUCCESS:
            return __assign(__assign({}, state), { productLog: __assign(__assign({}, state.productLog), action.payload) });
        case actions.GET_PRODUCT_LOG_NEXT_PAGE_SUCCESS:
            return __assign(__assign({}, state), { productLog: __assign(__assign({}, state.productLog), { products: __spreadArrays(state.productLog.products, action.payload.products) }) });
        default:
            return state;
    }
};
exports.productReducer = productReducer;
//# sourceMappingURL=product.reducer.js.map