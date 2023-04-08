"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const constants_1 = require("./constants");
const sql_highlighter_1 = require("@mikro-orm/sql-highlighter");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../.env") });
exports.default = (0, core_1.defineConfig)({
    type: "postgresql",
    dbName: "lireddit",
    debug: !constants_1.__prod__,
    entities: ["./dist/models"],
    user: config_1.default.postgres.user,
    password: config_1.default.postgres.password,
    port: Number(config_1.default.postgres.port),
    highlighter: new sql_highlighter_1.SqlHighlighter(),
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        glob: "!(*.d).{js,ts}",
    },
});
//# sourceMappingURL=mikro-orm.config.js.map