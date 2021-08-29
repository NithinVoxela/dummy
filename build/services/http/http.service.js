"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = exports.HttpRequestMethod = void 0;
var HttpRequestMethod;
(function (HttpRequestMethod) {
    HttpRequestMethod["GET"] = "get";
})(HttpRequestMethod = exports.HttpRequestMethod || (exports.HttpRequestMethod = {}));
var HttpService = /** @class */ (function () {
    function HttpService() {
        this._sanitizeParameter = function (queryParams) {
            if (queryParams) {
                return Object.entries(queryParams).reduce(function (acc, _a) {
                    var key = _a[0], value = _a[1];
                    if (value || value === 0 || value === false) {
                        acc[key] = value;
                    }
                    return acc;
                }, {});
            }
            return null;
        };
    }
    HttpService.prototype.get = function (url, queryParams) {
        var params = this._sanitizeParameter(queryParams);
        return this.httpService
            .get(url, {
            params: params
        })
            .then(function (res) { return res; });
    };
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map