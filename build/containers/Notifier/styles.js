"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
var styles_1 = require("@material-ui/core/styles");
var constants_1 = require("configs/constants");
var styles = function (theme) {
    return styles_1.createStyles({
        root: {
            position: "absolute",
            maxWidth: "calc(100% - " + constants_1.NUMBERS.HUNDRED.toString() + "px)",
            top: 24,
            left: "auto",
            right: 24,
            zIndex: theme.zIndex.snackbar
        },
        snackbar: {
            position: "static"
        }
    });
};
exports.styles = styles;
//# sourceMappingURL=styles.js.map