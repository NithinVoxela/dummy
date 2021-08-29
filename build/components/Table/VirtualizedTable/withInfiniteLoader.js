"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.withInfiniteLoader = void 0;
var React = require("react");
var react_virtualized_1 = require("react-virtualized");
var constants_1 = require("configs/constants");
var withInfiniteLoader = function (BaseVirtualizedTable) {
    return /** @class */ (function (_super) {
        __extends(InfiniteLoaderHOC, _super);
        function InfiniteLoaderHOC() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isRowLoaded = function (_a) {
                var index = _a.index;
                var rows = _this.props.rows;
                return !!rows[index];
            };
            _this.loadMoreRows = function (_a) {
                var startIndex = _a.startIndex;
                var _b = _this.props, nextPageCallback = _b.nextPageCallback, offset = _b.offset;
                if (offset !== startIndex) {
                    nextPageCallback(startIndex);
                }
            };
            return _this;
        }
        InfiniteLoaderHOC.prototype.render = function () {
            var _a = this.props, limit = _a.limit, rows = _a.rows, totalCount = _a.totalCount, offset = _a.offset, props = __rest(_a, ["limit", "rows", "totalCount", "offset"]);
            var threshold = limit > rows.length ? Math.floor(rows.length / constants_1.NUMBERS.TWO) : Math.floor(limit / constants_1.NUMBERS.TWO);
            return (React.createElement(react_virtualized_1.InfiniteLoader, { isRowLoaded: this.isRowLoaded, loadMoreRows: this.loadMoreRows, rowCount: totalCount, threshold: threshold }, function (_a) {
                var handleRowsRendered = _a.onRowsRendered, registerChild = _a.registerChild;
                return (React.createElement(BaseVirtualizedTable, __assign({}, props, { rows: rows, onRowsRendered: handleRowsRendered, registerChild: registerChild })));
            }));
        };
        return InfiniteLoaderHOC;
    }(React.PureComponent));
};
exports.withInfiniteLoader = withInfiniteLoader;
//# sourceMappingURL=withInfiniteLoader.js.map