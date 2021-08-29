"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
var styles_1 = require("@material-ui/core/styles");
var styles = function (theme) {
    return styles_1.createStyles({
        root: {
            backgroundColor: "#FFF",
            borderRadius: "0 0 5px 5px"
        },
        headerRow: {
            borderRadius: "5px 5px 0px 0px",
            backgroundColor: "#F7F7F8",
            color: "#2E2E3B"
        },
        row: {
            borderBottom: "1px solid #DADADA",
            padding: "10px 0",
            color: "#2E2E3B"
        },
        headerCell: {
            color: "#0071A5",
            fontSize: 18,
            textTransform: "capitalize",
            whiteSpace: "nowrap",
            "&:hover:not($disableSort)": {
                cursor: "pointer"
            }
        },
        disableSort: {},
        sortIcon: {
            fontSize: 8,
            marginLeft: 8,
            verticalAlign: "middle"
        },
        sortIconReversed: {
            transform: "rotate(180deg)"
        },
        cell: {
            color: "#2E2E3B",
            fontSize: 13,
            whiteSpace: "normal",
            wordBreak: "break-word",
            textAlign: "right"
        },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        screenSize_md: {
            minWidth: 1280 + theme.spacing(2)
        },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        screenSize_auto: {
            width: "auto"
        },
        noResults: {
            color: "#2E2E3B",
            textAlign: "center",
            fontSize: 16,
            margin: 10
        },
        tableCell: {
            display: "flex"
        },
        actionCheckbox: {
            margin: 24,
            marginTop: 0
        }
    });
};
exports.styles = styles;
//# sourceMappingURL=styles.js.map