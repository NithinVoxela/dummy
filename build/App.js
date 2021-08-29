"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var core_1 = require("@material-ui/core");
var React = require("react");
var root_1 = require("react-hot-loader/root");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var Base_1 = require("containers/Base");
var Routes_1 = require("./Routes");
var AppComponent = function (_a) {
    var store = _a.store;
    return (React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(core_1.CssBaseline, null),
        React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement(Base_1.BaseComponent, null,
                React.createElement(Routes_1.MainRoutes, null)))));
};
if (module.hot) {
    AppComponent = root_1.hot(AppComponent);
}
exports.App = AppComponent;
//# sourceMappingURL=App.js.map