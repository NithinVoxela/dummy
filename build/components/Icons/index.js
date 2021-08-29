"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortIcon = exports.withSvgIcon = void 0;
var SvgIcon_1 = require("@material-ui/core/SvgIcon");
var classnames_1 = require("classnames");
var React = require("react");
var sort_component_svg_1 = require("assets/icons/sort.component.svg");
var withSvgIcon = function (Icon, viewbox) {
    var iconComponent = function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (React.createElement(SvgIcon_1.default, __assign({}, props, { className: classnames_1.default(className, "Icon"), viewBox: viewbox }),
            React.createElement(Icon, null)));
    };
    return iconComponent;
};
exports.withSvgIcon = withSvgIcon;
exports.SortIcon = exports.withSvgIcon(sort_component_svg_1.default);
//# sourceMappingURL=index.js.map