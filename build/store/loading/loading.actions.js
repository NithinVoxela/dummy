"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideLoading = exports.showLoading = exports.HIDE_LOADING = exports.SHOW_LOADING = void 0;
exports.SHOW_LOADING = "[LOADING] SHOW_LOADING";
exports.HIDE_LOADING = "[LOADING] HIDE_LOADING";
var showLoading = function () { return ({
    type: exports.SHOW_LOADING
}); };
exports.showLoading = showLoading;
var hideLoading = function () { return ({
    type: exports.HIDE_LOADING
}); };
exports.hideLoading = hideLoading;
//# sourceMappingURL=loading.actions.js.map