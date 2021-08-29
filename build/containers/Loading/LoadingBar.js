"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingBar = void 0;
var core_1 = require("@material-ui/core");
var Modal_1 = require("@material-ui/core/Modal");
var React = require("react");
var react_redux_1 = require("react-redux");
var loader_svg_1 = require("assets/icons/loader.svg");
var loading_selector_1 = require("store/loading/loading.selector");
var styles_1 = require("./styles");
var LoadingBarComponent = function (_a) {
    var classes = _a.classes, loading = _a.loading;
    return (React.createElement(Modal_1.default, { open: loading },
        React.createElement("div", { className: classes.loadingContainer },
            React.createElement("img", { src: loader_svg_1.default }))));
};
var mapStateToProps = function (state) { return ({
    loading: loading_selector_1.getLoadingStatus(state)
}); };
exports.LoadingBar = core_1.withStyles(styles_1.styles)(react_redux_1.connect(mapStateToProps, null)(React.memo(LoadingBarComponent)));
//# sourceMappingURL=LoadingBar.js.map