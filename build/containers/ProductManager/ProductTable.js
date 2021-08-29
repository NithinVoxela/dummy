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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTable = void 0;
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = require("classnames");
var React = require("react");
var react_redux_1 = require("react-redux");
var VirtualizedTable_1 = require("components/Table/VirtualizedTable");
var VirtualizedTable_2 = require("components/Table/VirtualizedTable/VirtualizedTable");
var environment_selectors_1 = require("store/environment/environment.selectors");
var actions = require("store/product/product.actions");
var product_selector_1 = require("store/product/product.selector");
var filterActions = require("store/product/productLogFilters/productLogFilters.actions");
var productLogFilters_selector_1 = require("store/product/productLogFilters/productLogFilters.selector");
var productColumn_config_1 = require("./productColumn.config");
var styles_2 = require("./styles");
var ProductTableComponent = /** @class */ (function (_super) {
    __extends(ProductTableComponent, _super);
    function ProductTableComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.virtualizedTableRef = null;
        _this.onGetNextPage = function (offset) {
            var updateFilterParams = _this.props.updateFilterParams;
            updateFilterParams({ offset: offset });
        };
        _this.onSortChange = function (order, sortBy) {
            var updateFilterParams = _this.props.updateFilterParams;
            updateFilterParams({ sortOrder: order, sortBy: sortBy, offset: 0 });
        };
        _this.onFilterValueChange = function (param) { return function (e) {
            var _a;
            var value = e.target.value;
            var updateFilterParams = _this.props.updateFilterParams;
            updateFilterParams((_a = {}, _a[param] = value, _a.offset = 0, _a));
        }; };
        _this.configureData = function (_a) {
            var id = _a.id, title = _a.title, thumbnailUrl = _a.thumbnailUrl;
            var classes = _this.props.classes;
            return {
                id: id,
                title: (React.createElement("div", { className: classes.product },
                    React.createElement("img", { src: thumbnailUrl, className: classes.thumbnailUrl }),
                    React.createElement("div", { className: classes.productTitle }, title))),
                randomNumericField: Math.floor(Math.random() * 100)
            };
        };
        _this.getRows = function () {
            var productLog = _this.props.productLog;
            var selectedIds = _this.state.selectedIds;
            return productLog.products.map(function (logLine) { return ({
                id: logLine.id,
                selected: selectedIds.filter(function (product) { return logLine.id === product; }).length > 0,
                data: _this.configureData(logLine)
            }); });
        };
        _this.handleRowClick = function (_a) {
            var rowData = _a.rowData, index = _a.index;
            // eslint-disable-next-line no-console
            console.log(rowData, index);
        };
        _this.handleAllSelect = function (checked) {
            var products = _this.props.productLog.products;
            var selectedIds = _this.state.selectedIds;
            var selectedList = checked
                ? __spreadArrays(selectedIds, products.map(function (product) { return product.id; })) : selectedIds.filter(function (selectedId) { return products.findIndex(function (product) { return product.id === selectedId; }) === -1; });
            _this.setState({ selectedIds: selectedList });
        };
        _this.handleRowSelect = function (checked, rowData) {
            var selectedIds = _this.state.selectedIds;
            var selectedList = __spreadArrays(selectedIds);
            if (checked) {
                selectedList.push(rowData.id);
            }
            else {
                for (var i = 0; i < selectedList.length; i++) {
                    if (selectedList[i] === rowData.id) {
                        selectedList.splice(i, 1);
                    }
                }
            }
            _this.setState({ selectedIds: selectedList });
        };
        _this.handleSelectionChange = function (checked, _index, rowData) {
            if (_index === VirtualizedTable_2.HEADER_ROW_INDEX) {
                _this.handleAllSelect(checked);
            }
            else {
                _this.handleRowSelect(checked, rowData);
            }
        };
        _this.setVirtualizedTableRef = function (ref) {
            _this.virtualizedTableRef = ref;
        };
        _this.state = {
            selectedIds: []
        };
        return _this;
    }
    ProductTableComponent.prototype.componentDidMount = function () {
        var _a = this.props, maxRowsPerPage = _a.environment.constants.maxRowsPerPage, getProductLogLoadingRequest = _a.getProductLogLoadingRequest, filters = _a.filters, updateFilterParams = _a.updateFilterParams;
        var updatedFilters = __assign(__assign({}, filters), { limit: maxRowsPerPage });
        updateFilterParams(updatedFilters);
        getProductLogLoadingRequest(updatedFilters, { withDebounce: false });
    };
    ProductTableComponent.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, getProductLogLoadingRequest = _a.getProductLogLoadingRequest, getProductLogNextPageRequest = _a.getProductLogNextPageRequest, filters = _a.filters;
        var keywords = filters.keywords, offset = filters.offset;
        var prevFilters = prevProps.filters;
        var prevKeywords = prevFilters.keywords, prevOffset = prevFilters.offset;
        if (prevProps.filters !== filters) {
            if (offset > 0 && offset !== prevOffset) {
                getProductLogNextPageRequest(filters);
            }
            else if (filters.limit === prevFilters.limit) {
                var options = { withDebounce: false };
                if (keywords !== prevKeywords) {
                    options.withDebounce = true;
                }
                getProductLogLoadingRequest(filters, options);
                if (this.virtualizedTableRef) {
                    this.virtualizedTableRef.scrollToRow(0);
                }
            }
        }
    };
    ProductTableComponent.prototype.render = function () {
        var _a = this.props, classes = _a.classes, totalCount = _a.totalCount, _b = _a.filters, recordsLimit = _b.limit, offset = _b.offset, sortOrder = _b.sortOrder;
        return (React.createElement("div", { className: classnames_1.default(classes.root, "scrollVisible") },
            React.createElement("div", { className: classes.tableContainer },
                React.createElement(VirtualizedTable_1.VirtualizedInfiniteTable, { rows: this.getRows(), totalCount: totalCount, columns: productColumn_config_1.getProductLogTableColumns(), screenSize: "md", sortBy: "title", sortDirection: sortOrder, nextPageCallback: this.onGetNextPage, sortChangeCallback: this.onSortChange, limit: recordsLimit, offset: offset, setVirtualizedTableRef: this.setVirtualizedTableRef, onRowClick: this.handleRowClick, onSelectionChange: this.handleSelectionChange }))));
    };
    return ProductTableComponent;
}(React.Component));
var mapDispatchToProps = {
    getProductLogLoadingRequest: actions.getProductLogLoadingRequest,
    getProductLogNextPageRequest: actions.getProductLogNextPageRequest,
    updateFilterParams: filterActions.updateProductLogFilter
};
var mapStateToProps = function (state) { return ({
    environment: environment_selectors_1.getEnvironment(state),
    filters: productLogFilters_selector_1.getProductLogFilter(state),
    productLog: product_selector_1.getProductLog(state),
    totalCount: product_selector_1.getProductLogTotalCount(state)
}); };
exports.ProductTable = styles_1.withStyles(styles_2.styles)(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ProductTableComponent));
//# sourceMappingURL=ProductTable.js.map