"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    postgres: {
        user: process.env.POSTGRES_USER || "luongdao",
        password: process.env.POSTGRES_PASSWORD || "1234567@",
        port: Number(process.env.POSTGRES_PORT) || 5433,
    },
    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6381,
        password: process.env.REDIS_PASSWORD || "1234567@",
    },
};
//# sourceMappingURL=index.js.map