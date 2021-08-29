"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductLogTotalCount = exports.getProductLog = void 0;
var getProductLog = function (state) { return state.products.productLog; };
exports.getProductLog = getProductLog;
var getProductLogTotalCount = function (state) { return state.products.productLog.totalCount; };
exports.getProductLogTotalCount = getProductLogTotalCount;
//# sourceMappingURL=product.selector.js.map