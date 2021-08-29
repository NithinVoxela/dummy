"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
var styles_1 = require("@material-ui/core/styles");
var React = require("react");
var Loading_1 = require("containers/Loading");
var Notifier_1 = require("containers/Notifier");
var styles_2 = require("./styles");
var BaseComponent = function (_a) {
    var classes = _a.classes, children = _a.children;
    return (React.createElement("div", { className: classes.root },
        React.createElement("main", { className: classes.content },
            React.createElement("div", { className: classes.mainContent }, children)),
        React.createElement(Notifier_1.Notifier, null),
        React.createElement(Loading_1.LoadingBar, null)));
};
exports.Base = styles_1.withStyles(styles_2.styles)(BaseComponent);
//# sourceMappingURL=Base.js.map