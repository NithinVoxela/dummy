"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageContent = void 0;
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = require("classnames");
var React = require("react");
var styles_2 = require("./styles");
var PageContentComponent = function (_a) {
    var _b = _a.padded, padded = _b === void 0 ? false : _b, classes = _a.classes, children = _a.children, _c = _a.classesProps, classesProps = _c === void 0 ? {} : _c;
    return (React.createElement("div", { className: classnames_1.default(classes.scrollableWrapper, padded && classes.padded, classesProps.content) }, children));
};
exports.PageContent = styles_1.withStyles(styles_2.styles)(PageContentComponent);
//# sourceMappingURL=PageContent.js.map