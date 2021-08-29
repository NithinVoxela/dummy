"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationService = void 0;
var axios_1 = require("axios");
var ConfigurationService = /** @class */ (function () {
    function ConfigurationService() {
        this.getEnvironment = function () {
            return ConfigurationService._instance.httpService.get("config.json").then(function (res) { return res.data; });
        };
    }
    ConfigurationService.getInstance = function () {
        if (!ConfigurationService._instance) {
            ConfigurationService._instance = new ConfigurationService();
            ConfigurationService._instance.httpService = axios_1.default;
        }
        return ConfigurationService._instance;
    };
    return ConfigurationService;
}());
exports.configurationService = ConfigurationService.getInstance();
//# sourceMappingURL=configuration.service.js.map