"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProductLogNextPage = exports.getProductLogNextPageRequest = exports.getProductLogSuccess = exports.getProductLogLoadingRequest = exports.GET_PRODUCT_LOG_NEXT_PAGE_SUCCESS = exports.GET_PRODUCT_LOG_NEXT_PAGE_REQUEST = exports.GET_PRODUCT_LOG_SUCCESS = exports.GET_PRODUCT_LOG_LOADING_REQUEST = void 0;
exports.GET_PRODUCT_LOG_LOADING_REQUEST = "[PRODUCT_LOG] GET_PRODUCT_LOG_LOADING_REQUEST";
exports.GET_PRODUCT_LOG_SUCCESS = "[PRODUCT_LOG] GET_PRODUCT_LOG_SUCCESS";
exports.GET_PRODUCT_LOG_NEXT_PAGE_REQUEST = "[PRODUCT_LOG] GET_PRODUCT_LOG_NEXT_PAGE_REQUEST";
exports.GET_PRODUCT_LOG_NEXT_PAGE_SUCCESS = "[PRODUCT_LOG] GET_PRODUCT_LOG_NEXT_PAGE_SUCCESS";
var getProductLogLoadingRequest = function (filterParams, options) { return ({
    type: exports.GET_PRODUCT_LOG_LOADING_REQUEST,
    payload: filterParams,
    options: options
}); };
exports.getProductLogLoadingRequest = getProductLogLoadingRequest;
var getProductLogSuccess = function (product) { return ({
    type: exports.GET_PRODUCT_LOG_SUCCESS,
    payload: product
}); };
exports.getProductLogSuccess = getProductLogSuccess;
var getProductLogNextPageRequest = function (filterParams) { return ({
    type: exports.GET_PRODUCT_LOG_NEXT_PAGE_REQUEST,
    payload: filterParams
}); };
exports.getProductLogNextPageRequest = getProductLogNextPageRequest;
var setProductLogNextPage = function (product) { return ({
    type: exports.GET_PRODUCT_LOG_NEXT_PAGE_SUCCESS,
    payload: product
}); };
exports.setProductLogNextPage = setProductLogNextPage;
//# sourceMappingURL=product.actions.js.map