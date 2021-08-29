"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
var core_1 = require("@material-ui/core");
var styles = function (theme) {
    return core_1.createStyles({
        root: {
            height: "100%",
            margin: theme.spacing(2),
            padding: theme.spacing(2),
            backgroundColor: "#FFF",
            borderRadius: 6,
            overflowX: "auto",
            overflowY: "hidden"
        },
        tableContainer: {
            height: "100%"
        },
        product: {
            display: "flex",
            justifyContent: "space-between"
        },
        thumbnailUrl: {
            height: 40,
            width: 40
        },
        productTitle: {
            padding: theme.spacing()
        }
    });
};
exports.styles = styles;
//# sourceMappingURL=styles.js.map