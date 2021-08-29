"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchOffNotification = exports.removeNotification = exports.deleteNotification = exports.addNotification = exports.SWITCH_OFF_NOTIFICATION = exports.REMOVE_NOTIFICATION = exports.DELETE_NOTIFICATION = exports.ADD_NOTIFICATION = void 0;
exports.ADD_NOTIFICATION = "[NOTIFIER] ADD_NOTIFICATION";
exports.DELETE_NOTIFICATION = "[NOTIFIER] DELETE_NOTIFICATION";
exports.REMOVE_NOTIFICATION = "[NOTIFIER] REMOVE_NOTIFICATION";
exports.SWITCH_OFF_NOTIFICATION = "[NOTIFIER] SWITCH_OFF_NOTIFICATION";
var addNotification = function (notification) { return ({
    type: exports.ADD_NOTIFICATION,
    payload: notification
}); };
exports.addNotification = addNotification;
var deleteNotification = function (id) { return ({
    type: exports.DELETE_NOTIFICATION,
    payload: id
}); };
exports.deleteNotification = deleteNotification;
var removeNotification = function (id) { return ({
    type: exports.REMOVE_NOTIFICATION,
    payload: id
}); };
exports.removeNotification = removeNotification;
var switchOffNotification = function (id) { return ({
    type: exports.SWITCH_OFF_NOTIFICATION,
    payload: id
}); };
exports.switchOffNotification = switchOffNotification;
//# sourceMappingURL=notifier.action.js.map