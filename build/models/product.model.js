"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductLogModel = void 0;
var productData_model_1 = require("./productData.model");
var ProductLogModel = /** @class */ (function () {
    function ProductLogModel(model) {
        this.products = model.products ? model.products.map(function (product) { return new productData_model_1.ProductDataModel(product); }) : [];
        this.totalCount = model.totalCount;
    }
    return ProductLogModel;
}());
exports.ProductLogModel = ProductLogModel;
//# sourceMappingURL=product.model.js.map