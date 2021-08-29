"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseNotification = void 0;
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var icons_1 = require("@material-ui/icons");
var classnames_1 = require("classnames");
var React = require("react");
var styles_2 = require("./styles");
var BaseNotificationComponent = function (_a) {
    var classes = _a.classes, _b = _a.variant, variant = _b === void 0 ? "error" : _b, notification = _a.notification, handleClose = _a.onClose;
    return (React.createElement(core_1.SnackbarContent, { onClick: handleClose, className: classnames_1.default(classes.root, classes[variant]), classes: {
            action: classes.action
        }, message: React.createElement("span", { className: classes.message },
            React.createElement(core_1.Typography, { variant: "h5", className: classes.header }, notification.header),
            React.createElement(core_1.Typography, { className: classes.message }, notification.message)), action: [
            React.createElement(core_1.IconButton, { key: "close", "aria-label": "Close", color: "inherit", className: classes.closeButton, onClick: handleClose },
                React.createElement(icons_1.Close, { className: classes.closeIcon }))
        ] }));
};
exports.BaseNotification = styles_1.withStyles(styles_2.styles)(BaseNotificationComponent);
//# sourceMappingURL=BaseNotification.js.map