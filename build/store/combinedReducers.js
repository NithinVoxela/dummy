"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allReducers = exports.rootReducer = void 0;
var redux_1 = require("redux");
var notifier_reducer_1 = require("containers/Notifier/store/notifier.reducer");
var loading_reducer_1 = require("store/loading/loading.reducer");
var product_reducer_1 = require("./product/product.reducer");
var productLogFilters_reducer_1 = require("./product/productLogFilters/productLogFilters.reducer");
var translation_reducer_1 = require("./translation/translation.reducer");
var allReducers = {
    translation: translation_reducer_1.translationReducer,
    environment: function (state) {
        if (state === void 0) { state = {}; }
        return state;
    },
    loading: loading_reducer_1.loadingReducer,
    notifications: notifier_reducer_1.notifierReducer,
    products: product_reducer_1.productReducer,
    productFilters: productLogFilters_reducer_1.productFilterReducer
};
exports.allReducers = allReducers;
var rootReducer = redux_1.combineReducers(allReducers);
exports.rootReducer = rootReducer;
//# sourceMappingURL=combinedReducers.js.map