"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
var styles_1 = require("@material-ui/core/styles");
var styles = function (theme) {
    return styles_1.createStyles({
        scrollableWrapper: {
            height: "100%",
            padding: theme.spacing()
        },
        padded: {
            padding: theme.spacing(2)
        }
    });
};
exports.styles = styles;
//# sourceMappingURL=styles.js.map