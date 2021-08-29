"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRoutes = void 0;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var routes_config_1 = require("configs/routes/routes.config");
var ProductTable_1 = require("containers/ProductManager/ProductTable");
var routeCreater = function (Component, _a) {
    var routeConfig = _a.routeConfig, _b = _a.exact, exact = _b === void 0 ? true : _b;
    return ({
        Component: Component,
        exact: exact,
        path: routeConfig.to
    });
};
var routeMap = [routeCreater(ProductTable_1.ProductTable, { routeConfig: routes_config_1.routes.products })];
var MainRoutes = function () { return (
// eslint-disable-next-line react/jsx-no-useless-fragment
React.createElement(React.Fragment, null, routeMap.map(function (_a) {
    var Component = _a.Component, exact = _a.exact, path = _a.path;
    return React.createElement(react_router_dom_1.Route, { exact: exact, path: path, key: path, component: Component });
}))); };
exports.MainRoutes = MainRoutes;
//# sourceMappingURL=Routes.js.map