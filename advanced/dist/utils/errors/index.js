"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomGraphQLError = exports.ApolloErrorCode = void 0;
const graphql_1 = require("graphql");
var ApolloErrorCode;
(function (ApolloErrorCode) {
    ApolloErrorCode["GRAPHQL_PARSE_FAILED"] = "GRAPHQL_PARSE_FAILED";
    ApolloErrorCode["GRAPHQL_VALIDATION_FAILED"] = "GRAPHQL_VALIDATION_FAILED";
    ApolloErrorCode["BAD_USER_INPUT"] = "BAD_USER_INPUT";
    ApolloErrorCode["PERSISTED_QUERY_NOT_FOUND"] = "PERSISTED_QUERY_NOT_FOUND";
    ApolloErrorCode["PERSISTED_QUERY_NOT_SUPPORTED"] = "PERSISTED_QUERY_NOT_SUPPORTED";
    ApolloErrorCode["OPERATION_RESOLUTION_FAILURE"] = "OPERATION_RESOLUTION_FAILURE";
    ApolloErrorCode["BAD_REQUEST"] = "BAD_REQUEST";
    ApolloErrorCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ApolloErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ApolloErrorCode["DUPLICATE_ERROR"] = "DUPLICATE_ERROR";
    ApolloErrorCode["UNEXPECTED_STATE"] = "UNEXPECTED_STATE";
    ApolloErrorCode["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
    ApolloErrorCode["NOT_ALLOWED"] = "NOT_ALLOWED";
    ApolloErrorCode["CONFLICT"] = "CONFLICT";
    ApolloErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
})(ApolloErrorCode = exports.ApolloErrorCode || (exports.ApolloErrorCode = {}));
class CustomGraphQLError extends graphql_1.GraphQLError {
    constructor({ code, message, detail }, options) {
        super(message, options);
        this.extensions.code = code;
        this.extensions.custom_detail = message;
        if (detail) {
            this.extensions.detail = detail;
        }
    }
}
exports.CustomGraphQLError = CustomGraphQLError;
//# sourceMappingURL=index.js.map