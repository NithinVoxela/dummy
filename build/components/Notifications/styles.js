"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
var styles_1 = require("@material-ui/core/styles");
var styles = function () {
    return styles_1.createStyles({
        root: {
            flexWrap: "nowrap",
            alignItems: "flex-start",
            margin: "8px 0",
            wordBreak: "break-word"
        },
        action: {
            color: "#FFF",
            opacity: 0.5,
            marginRight: -16
        },
        header: {
            color: "#FFF"
        },
        message: {
            color: "#FFF",
            fontSize: 15,
            lineHeight: 1.25,
            letterSpacing: 0.2
        },
        closeIcon: {
            fontSize: 18
        },
        closeButton: {
            padding: 6
        },
        error: {
            background: "#0096D5",
            width: 600
        }
    });
};
exports.styles = styles;
//# sourceMappingURL=styles.js.map