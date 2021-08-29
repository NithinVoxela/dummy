"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
var styles_1 = require("@material-ui/core/styles");
// import { styles as inputStyles } from "components/General/Inputs/inputStyles";
var styles = function () {
    return styles_1.createStyles({
        coloredCheckboxTick: {
            "& .MuiIconButton-label": {
                position: "relative",
                zIndex: 0
            },
            "& .MuiIconButton-label:after": {
                position: "absolute",
                zIndex: -1,
                content: '""',
                width: "60%",
                height: "60%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#FFF"
            }
        },
        label: {
            color: "#2E2E3B",
            fontSize: 18
        }
    });
};
exports.styles = styles;
//# sourceMappingURL=styles.js.map