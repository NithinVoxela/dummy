"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.HANDLE_ERROR = void 0;
exports.HANDLE_ERROR = "[NOTIFIER] HANDLE_ERROR";
var handleError = function (error, options) {
    if (options === void 0) { options = {}; }
    return ({
        type: exports.HANDLE_ERROR,
        payload: { error: error, message: options.message || error.message }
    });
};
exports.handleError = handleError;
//# sourceMappingURL=errorHandler.action.js.map