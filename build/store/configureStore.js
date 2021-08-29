"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStore = exports.sagaMiddleware = void 0;
var redux_1 = require("redux");
var developmentOnly_1 = require("redux-devtools-extension/developmentOnly");
var redux_saga_1 = require("redux-saga");
var combinedReducers_1 = require("./combinedReducers");
exports.sagaMiddleware = redux_saga_1.default();
var selectedCompose = process.env.NODE_ENV === "development" ? developmentOnly_1.composeWithDevTools : redux_1.compose;
var AppStore = /** @class */ (function () {
    function AppStore() {
    }
    AppStore.getInstance = function (initialState) {
        if (!AppStore._instance && initialState) {
            var store_1 = redux_1.createStore(combinedReducers_1.rootReducer, initialState, selectedCompose(redux_1.applyMiddleware(exports.sagaMiddleware)));
            if (module.hot) {
                module.hot.accept("./combinedReducers.ts", function () {
                    // @ts-ignore
                    var nextRootReducer = combinedReducers_1.rootReducer.default;
                    store_1.replaceReducer(nextRootReducer);
                });
            }
            AppStore._instance = store_1;
        }
        return AppStore._instance;
    };
    AppStore._instance = null;
    return AppStore;
}());
exports.AppStore = AppStore;
//# sourceMappingURL=configureStore.js.map