"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("../mikro-orm.config"));
async function connectDB() {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    const migrator = orm.getMigrator();
    const migrations = await migrator.getPendingMigrations();
    if (migrations === null || migrations === void 0 ? void 0 : migrations.length) {
        await orm.getMigrator().up();
    }
    return orm;
}
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map