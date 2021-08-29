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
exports.notifierReducer = void 0;
var uuid_1 = require("uuid");
var action_model_1 = require("store/action.model");
var notifier_action_1 = require("./notifier.action");
var initialState = [];
var notifierReducer = function (state, _a) {
    if (state === void 0) { state = initialState; }
    var _b = _a === void 0 ? {} : _a, type = _b.type, payload = _b.payload;
    switch (type) {
        case notifier_action_1.ADD_NOTIFICATION:
            if (payload.header === action_model_1.ErrorValues.error && state.some(function (error) { return error.message === payload.message; })) {
                return state;
            }
            return __spreadArrays(state, [__assign({ id: uuid_1.v4(), active: true }, payload)]);
        case notifier_action_1.SWITCH_OFF_NOTIFICATION: {
            var currentNotification = state.find(function (notification) { return notification.id === payload; });
            currentNotification.active = false;
            return __spreadArrays(state);
        }
        case notifier_action_1.DELETE_NOTIFICATION:
            return state.filter(function (notification) { return notification.id !== payload; });
        default:
            return state;
    }
};
exports.notifierReducer = notifierReducer;
//# sourceMappingURL=notifier.reducer.js.map