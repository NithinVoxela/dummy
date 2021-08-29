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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualizedTable = exports.VirtualizedInfiniteTable = exports.HEADER_ROW_INDEX = exports.ColumnAlignment = void 0;
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = require("classnames");
var React = require("react");
var react_virtualized_1 = require("react-virtualized");
require("react-virtualized/styles.css");
var Checkbox_1 = require("components/Checkbox");
var Icons_1 = require("components/Icons");
var constants_1 = require("configs/constants");
var translation_service_1 = require("services/translation/translation.service");
var styles_2 = require("./styles");
var withAdjustedWidthHeight_1 = require("./withAdjustedWidthHeight");
var withInfiniteLoader_1 = require("./withInfiniteLoader");
var ColumnAlignment;
(function (ColumnAlignment) {
    ColumnAlignment["Left"] = "left";
    ColumnAlignment["Right"] = "right";
})(ColumnAlignment = exports.ColumnAlignment || (exports.ColumnAlignment = {}));
exports.HEADER_ROW_INDEX = -1;
var VirtualizedTableComponent = /** @class */ (function (_super) {
    __extends(VirtualizedTableComponent, _super);
    function VirtualizedTableComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.overscanRowCount = 10;
        _this.rowHeight = 80;
        _this.initialColumnWidth = 100;
        _this.cache = new react_virtualized_1.CellMeasurerCache({
            defaultHeight: 60,
            minHeight: 60,
            fixedWidth: true
        });
        _this.getSeletedRowIndices = function () {
            var rows = _this.props.rows;
            var seletedRowIndices = [];
            for (var i = rows.length - 1; i >= 0; i--) {
                if (rows[i].selected) {
                    seletedRowIndices.unshift(i);
                }
            }
            return seletedRowIndices;
        };
        _this.rowGetter = function (_a) {
            var index = _a.index;
            var rows = _this.props.rows;
            return rows[index].data;
        };
        _this.cellRenderer = function (_a) {
            var cellData = _a.cellData, columnData = _a.columnData, dataKey = _a.dataKey, columnIndex = _a.columnIndex, parent = _a.parent, rowIndex = _a.rowIndex;
            var classes = _this.props.classes;
            var cell = cellData === null ? (translation_service_1.translationService.getMessageTranslation("global-loading-label", "Loading")) : (React.createElement(core_1.TableCell, { component: "div", className: classnames_1.default(classes.cell), variant: "body", style: { height: _this.cache.rowHeight({ index: rowIndex }) }, classes: {
                    root: classes.tableCell
                }, align: columnData.align }, cellData));
            return (React.createElement(react_virtualized_1.CellMeasurer, { cache: _this.cache, columnIndex: columnIndex, key: dataKey, parent: parent, rowIndex: rowIndex }, cell));
        };
        _this.headerRenderer = function (_a) {
            var columnData = _a.columnData, dataKey = _a.dataKey, sortBy = _a.sortBy, label = _a.label, sortDirection = _a.sortDirection, disableSort = _a.disableSort;
            var classes = _this.props.classes;
            var handleClick = function () {
                if (!disableSort) {
                    _this.switchSort(dataKey, sortDirection);
                }
            };
            return (React.createElement(core_1.TableCell, { component: "div", className: classnames_1.default(classes.headerCell, disableSort && classes.disableSort), variant: "head", style: { height: _this.headerHeight }, onClick: handleClick, classes: {
                    root: classes.tableCell
                }, align: columnData.align },
                label,
                dataKey === sortBy && _this.getSortIcon(sortDirection)));
        };
        _this.switchSort = function (dataKey, sortDirection) {
            var sortBy = _this.state.sortBy;
            var sortChangeCallback = _this.props.sortChangeCallback;
            var handleChangeDirection = function () {
                sortDirection === "ASC" ? sortChangeCallback("DESC", dataKey) : sortChangeCallback("ASC", dataKey);
            };
            if (sortBy === dataKey) {
                handleChangeDirection();
            }
            else {
                _this.setState({ sortBy: dataKey }, function () { return handleChangeDirection(); });
            }
        };
        _this.getSortIcon = function (sortDirection) {
            var classes = _this.props.classes;
            if (sortDirection === "ASC") {
                return React.createElement(Icons_1.SortIcon, { className: classnames_1.default(classes.sortIcon, classes.sortIconReversed) });
            }
            else {
                return React.createElement(Icons_1.SortIcon, { className: classnames_1.default(classes.sortIcon) });
            }
        };
        _this.rowClassName = function (_a) {
            var index = _a.index;
            var classes = _this.props.classes;
            if (index === -1) {
                return classes.headerRow;
            }
            return classes.row;
        };
        _this.noRowsRenderer = function () {
            var classes = _this.props.classes;
            return (React.createElement(core_1.Typography, { className: classes.noResults }, translation_service_1.translationService.getMessageTranslation("global-no-results-label", "No results")));
        };
        _this.registerChildRef = function (registeredChild) {
            var _a = _this.props, registerChild = _a.registerChild, setVirtualizedTableRef = _a.setVirtualizedTableRef;
            if (registerChild) {
                registerChild(registeredChild);
            }
            if (setVirtualizedTableRef) {
                setVirtualizedTableRef(registeredChild);
            }
        };
        _this.getSelectAllCheckbox = function () {
            var classes = _this.props.classes;
            return (React.createElement("div", { key: "selectAllCheckbox" },
                React.createElement(Checkbox_1.Checkbox, { checked: _this.allRowsSelected, indeterminate: _this.indeterminateRowsSelected, onChange: _this.handleRowSelect(exports.HEADER_ROW_INDEX, null), className: classes.actionCheckbox })));
        };
        _this.headerRowRenderer = function (_a) {
            var className = _a.className, columns = _a.columns, style = _a.style;
            columns.unshift(_this.getSelectAllCheckbox());
            return (React.createElement("div", { className: className, role: "row", style: style }, columns));
        };
        _this.handleRowSelect = function (index, rowData) { return function (_event, checked) {
            var onSelectionChange = _this.props.onSelectionChange;
            if (onSelectionChange) {
                onSelectionChange(checked, index, rowData);
            }
        }; };
        _this.getRowCheckbox = function (key, index, rowData) {
            var _a = _this.props, classes = _a.classes, rows = _a.rows;
            return (React.createElement("div", { key: key },
                React.createElement(Checkbox_1.Checkbox, { checked: rows[index].selected, onChange: _this.handleRowSelect(index, rowData), className: classes.actionCheckbox })));
        };
        _this.rowRenderer = function (_a) {
            var className = _a.className, columns = _a.columns, index = _a.index, key = _a.key, onRowClick = _a.onRowClick, rowData = _a.rowData, style = _a.style;
            var rowProps = { "aria-rowindex": index + 1 };
            if (onRowClick) {
                rowProps["aria-label"] = "row";
                rowProps.tabIndex = 0;
                rowProps.onClick = function (event) { return onRowClick({ event: event, index: index, rowData: rowData }); };
            }
            columns.unshift(_this.getRowCheckbox(key, index, rowData));
            return (React.createElement("div", __assign({}, rowProps, { className: className, key: key, role: "row", style: style }), columns));
        };
        _this.screenSize = props.screenSize || "md";
        _this.headerHeight = props.headerHeight || constants_1.NUMBERS.SEVENTY;
        _this.initialSortDirection = props.sortDirection;
        _this.state = {
            sortBy: props.sortBy
        };
        return _this;
    }
    VirtualizedTableComponent.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, autoWidth = _a.autoWidth, rows = _a.rows;
        var prevAutoWidth = prevProps.autoWidth, prevRows = prevProps.rows;
        if (prevAutoWidth !== autoWidth || rows !== prevRows) {
            this.cache.clearAll();
        }
    };
    VirtualizedTableComponent.prototype.getColumnWidth = function (percentageWidth) {
        var width = this.props.width;
        return width * (percentageWidth / constants_1.NUMBERS.HUNDRED);
    };
    Object.defineProperty(VirtualizedTableComponent.prototype, "indeterminateRowsSelected", {
        get: function () {
            var rows = this.props.rows;
            return !this.allRowsSelected && (rows === null || rows === void 0 ? void 0 : rows.some(function (row) { return row.selected; }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VirtualizedTableComponent.prototype, "allRowsSelected", {
        get: function () {
            var rows = this.props.rows;
            return (rows === null || rows === void 0 ? void 0 : rows.length) > 0 && (rows === null || rows === void 0 ? void 0 : rows.filter(function (row) { return !row.selected; }).length) === 0;
        },
        enumerable: false,
        configurable: true
    });
    VirtualizedTableComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, columns = _a.columns, classes = _a.classes, width = _a.width, height = _a.height, handleRowsRendered = _a.onRowsRendered, sortDirection = _a.sortDirection, handleRowClick = _a.onRowClick, rows = _a.rows;
        var sortBy = this.state.sortBy;
        return (React.createElement(react_virtualized_1.Table, { rowClassName: this.rowClassName, gridClassName: classnames_1.default(classes.root, "scrollVisible"), width: width, height: height, className: classes["screenSize_" + this.screenSize], headerHeight: this.headerHeight, rowHeight: this.cache.rowHeight, deferredMeasurementCache: this.cache, rowCount: rows.length, rowGetter: this.rowGetter, noRowsRenderer: this.noRowsRenderer, overscanRowCount: this.overscanRowCount, sortBy: sortBy, sortDirection: sortDirection, onRowsRendered: handleRowsRendered, ref: this.registerChildRef, headerRowRenderer: this.headerRowRenderer, rowRenderer: this.rowRenderer, onRowClick: handleRowClick }, columns
            .filter(function (_a) {
            var _b = _a.visibility, visibility = _b === void 0 ? true : _b;
            return visibility;
        })
            .map(function (_a) {
            var align = _a.align, columnWidth = _a.width, maxWidth = _a.maxWidth, key = _a.key, label = _a.label, disableSort = _a.disableSort, widthInPercentage = _a.widthInPercentage;
            return (React.createElement(react_virtualized_1.Column, { flexGrow: 1, width: widthInPercentage ? _this.getColumnWidth(columnWidth) : columnWidth || _this.initialColumnWidth, maxWidth: maxWidth, cellRenderer: _this.cellRenderer, headerRenderer: _this.headerRenderer, disableSort: disableSort, label: label, dataKey: key, key: key, columnData: { align: align } }));
        })));
    };
    return VirtualizedTableComponent;
}(React.PureComponent));
exports.VirtualizedInfiniteTable = styles_1.withStyles(styles_2.styles)(withAdjustedWidthHeight_1.withAdjustedWidthHeight(withInfiniteLoader_1.withInfiniteLoader(VirtualizedTableComponent)));
exports.VirtualizedTable = styles_1.withStyles(styles_2.styles)(withAdjustedWidthHeight_1.withAdjustedWidthHeight(VirtualizedTableComponent));
//# sourceMappingURL=VirtualizedTable.js.map