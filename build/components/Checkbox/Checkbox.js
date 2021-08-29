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
exports.Checkbox = void 0;
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = require("classnames");
var React = require("react");
var styles_2 = require("./styles");
var CheckboxComponent = function (_a) {
    var classes = _a.classes, children = _a.children, label = _a.label, value = _a.value, checked = _a.checked, labelClasses = _a.labelClasses, className = _a.className, handleChange = _a.onChange, props = __rest(_a, ["classes", "children", "label", "value", "checked", "labelClasses", "className", "onChange"]);
    if (children || label) {
        return (React.createElement(core_1.FormControlLabel, { className: className, classes: {
                label: classnames_1.default(classes.label, labelClasses)
            }, control: React.createElement(core_1.Checkbox, __assign({ classes: {
                    checked: classnames_1.default(classes.coloredCheckboxTick),
                    indeterminate: classnames_1.default(classes.coloredCheckboxTick)
                }, value: value, checked: checked, onChange: handleChange }, props)), label: children || label }));
    }
    else {
        return (React.createElement(core_1.Checkbox, __assign({ classes: {
                checked: classnames_1.default(classes.coloredCheckboxTick),
                indeterminate: classnames_1.default(classes.coloredCheckboxTick)
            }, value: value, checked: checked, className: className, onChange: handleChange }, props)));
    }
};
exports.Checkbox = styles_1.withStyles(styles_2.styles)(CheckboxComponent);
//# sourceMappingURL=Checkbox.js.map