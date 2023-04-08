"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const resolver_1 = require("../grapql/auth/resolver");
const type_graphql_1 = require("type-graphql");
const resolver_2 = require("../grapql/post/resolver");
const auth_1 = __importDefault(require("../middlewares/auth"));
const resolver_3 = require("../grapql/user/resolver");
async function default_1(app, em) {
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [resolver_2.PostResolver, resolver_1.AuthResolver, resolver_3.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            em: em.fork(),
        }),
        formatError(error) {
            var _a;
            const customError = {
                code: error.extensions.code,
                message: error.extensions.custom_detail ||
                    ((_a = error.extensions.exception) === null || _a === void 0 ? void 0 : _a.detail) ||
                    error.message,
            };
            if (error.extensions.detail) {
                customError.detail = error.extensions.detail;
            }
            return customError;
        },
    });
    await apolloServer.start();
    app.use(auth_1.default);
    apolloServer.applyMiddleware({ app });
}
exports.default = default_1;
//# sourceMappingURL=graphql.js.map