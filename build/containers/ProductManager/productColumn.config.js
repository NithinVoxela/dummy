"use strict";
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
exports.getProductLogTableColumns = exports.columnParams = void 0;
var VirtualizedTable_1 = require("components/Table/VirtualizedTable/VirtualizedTable");
var numbers_1 = require("configs/constants/numbers");
var translation_service_1 = require("services/translation/translation.service");
var columnParams = function () {
    return {
        title: {
            width: numbers_1.NUMBERS.SEVENTY,
            label: translation_service_1.translationService.getMessageTranslation("product-name-label", "Product Name"),
            disableSort: false,
            widthInPercentage: true
        },
        randomNumericField: {
            width: numbers_1.NUMBERS.TWENTY,
            align: VirtualizedTable_1.ColumnAlignment.Right,
            label: translation_service_1.translationService.getMessageTranslation("product-random-numeric-field-label", "Random numeric field"),
            disableSort: true,
            widthInPercentage: true
        }
    };
};
exports.columnParams = columnParams;
var getProductLogTableColumns = function () {
    var columnsEntries = Object.entries(exports.columnParams());
    return columnsEntries.map(function (_a) {
        var key = _a[0], value = _a[1];
        return (__assign({ key: key }, value));
    });
};
exports.getProductLogTableColumns = getProductLogTableColumns;
//# sourceMappingURL=productColumn.config.js.map