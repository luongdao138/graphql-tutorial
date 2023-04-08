"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const graphql_1 = __importDefault(require("./config/graphql"));
const redis_1 = require("./config/redis");
const base_1 = __importDefault(require("./middlewares/base"));
(async () => {
    const app = (0, express_1.default)();
    (0, base_1.default)(app);
    const orm = await (0, db_1.connectDB)();
    await (0, graphql_1.default)(app, orm.em);
    (0, redis_1.connectRedisDB)();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 http://localhost:${PORT}/graphql`);
        console.log(`Server listening on port ${PORT}`);
    });
})().catch((error) => {
    console.log(error);
});
//# sourceMappingURL=app.js.map