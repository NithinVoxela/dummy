"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifier = void 0;
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var React = require("react");
var react_redux_1 = require("react-redux");
var BaseNotification_1 = require("components/Notifications/BaseNotification");
var constants_1 = require("configs/constants");
var notifier_action_1 = require("./store/notifier.action");
var styles_2 = require("./styles");
var NotifierComponent = /** @class */ (function (_super) {
    __extends(NotifierComponent, _super);
    function NotifierComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClose = function (id) { return function (_e, reason) {
            var removeNotification = _this.props.removeNotification;
            if (reason === "clickaway") {
                return;
            }
            removeNotification(id);
        }; };
        return _this;
    }
    NotifierComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, notifications = _a.notifications, _b = _a.autoHideDuration, autoHideDuration = _b === void 0 ? constants_1.NUMBERS.FIVE_THOUSAND : _b;
        return (React.createElement("div", { className: classes.root }, notifications.map(function (notification) { return (React.createElement(core_1.Snackbar, { key: notification.id, classes: {
                root: classes.snackbar
            }, autoHideDuration: notification.header === "Error" ? null : autoHideDuration, anchorOrigin: {
                vertical: "top",
                horizontal: "right"
            }, open: notification.active, onClose: _this.handleClose(notification.id) },
            React.createElement(BaseNotification_1.BaseNotification, { variant: "error", notification: notification, onClose: _this.handleClose(notification.id) }))); })));
    };
    return NotifierComponent;
}(React.PureComponent));
var mapStateToprops = function (state) { return ({
    notifications: state.notifications
}); };
var mapDispatchToProps = {
    removeNotification: notifier_action_1.removeNotification
};
exports.Notifier = styles_1.withStyles(styles_2.styles)(react_redux_1.connect(mapStateToprops, mapDispatchToProps)(NotifierComponent));
//# sourceMappingURL=Notifier.js.map