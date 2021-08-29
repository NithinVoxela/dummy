"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServiceFactory = void 0;
var axios_1 = require("axios");
var http_service_1 = require("services/http/http.service");
var configureStore_1 = require("store/configureStore");
var HttpServiceFactory = /** @class */ (function () {
    function HttpServiceFactory() {
    }
    HttpServiceFactory.getCoreService = function () {
        if (!HttpServiceFactory._coreService.httpService) {
            HttpServiceFactory._createCoreService();
        }
        return HttpServiceFactory._coreService;
    };
    HttpServiceFactory.createServices = function () {
        HttpServiceFactory._createCoreService();
    };
    HttpServiceFactory._createCoreService = function () {
        HttpServiceFactory._coreService.httpService = HttpServiceFactory._createHttpService("frontEndApi");
    };
    HttpServiceFactory._createHttpService = function (endpoint) {
        var appStore = configureStore_1.AppStore.getInstance();
        if (!appStore) {
            return null;
        }
        var state = appStore.getState();
        var environment = state.environment;
        if (!environment) {
            return null;
        }
        return axios_1.default.create({
            baseURL: environment.apiEndpoints[endpoint]
        });
    };
    HttpServiceFactory._coreService = new http_service_1.HttpService();
    return HttpServiceFactory;
}());
exports.HttpServiceFactory = HttpServiceFactory;
//# sourceMappingURL=http.serviceFactory.js.map