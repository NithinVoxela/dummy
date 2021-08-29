"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductLogFilter = exports.UPDATE_PRODUCT_LOG_FILTERS = void 0;
exports.UPDATE_PRODUCT_LOG_FILTERS = "[PRODUCT_FILTER] UPDATE_PRODUCT_LOG_FILTERS";
var updateProductLogFilter = function (filterParams) { return ({
    type: exports.UPDATE_PRODUCT_LOG_FILTERS,
    payload: filterParams
}); };
exports.updateProductLogFilter = updateProductLogFilter;
//# sourceMappingURL=productLogFilters.actions.js.map