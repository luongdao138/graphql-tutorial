"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEntityId = void 0;
const ulid_1 = require("ulid");
function generateEntityId(idProperty, prefix) {
    if (idProperty) {
        return idProperty;
    }
    const id = (0, ulid_1.ulid)();
    prefix = prefix ? `${prefix}_` : "";
    return `${prefix}${id}`;
}
exports.generateEntityId = generateEntityId;
//# sourceMappingURL=generate-id.js.map