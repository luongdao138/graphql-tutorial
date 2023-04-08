"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const type_graphql_1 = require("type-graphql");
var Order;
(function (Order) {
    Order["ASC"] = "ASC";
    Order["DESC"] = "DESC";
})(Order = exports.Order || (exports.Order = {}));
(0, type_graphql_1.registerEnumType)(Order, { name: "Order", description: "Sort order" });
//# sourceMappingURL=enum.js.map