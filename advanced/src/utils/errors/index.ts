import { GraphQLError, GraphQLErrorOptions } from "graphql";

export enum ApolloErrorCode {
  GRAPHQL_PARSE_FAILED = "GRAPHQL_PARSE_FAILED",
  GRAPHQL_VALIDATION_FAILED = "GRAPHQL_VALIDATION_FAILED",
  BAD_USER_INPUT = "BAD_USER_INPUT",
  PERSISTED_QUERY_NOT_FOUND = "PERSISTED_QUERY_NOT_FOUND",
  PERSISTED_QUERY_NOT_SUPPORTED = "PERSISTED_QUERY_NOT_SUPPORTED",
  OPERATION_RESOLUTION_FAILURE = "OPERATION_RESOLUTION_FAILURE",
  BAD_REQUEST = "BAD_REQUEST",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_FOUND = "NOT_FOUND",
  DUPLICATE_ERROR = "DUPLICATE_ERROR",
  UNEXPECTED_STATE = "UNEXPECTED_STATE",
  INVALID_ARGUMENT = "INVALID_ARGUMENT",
  NOT_ALLOWED = "NOT_ALLOWED",
  CONFLICT = "CONFLICT",
  UNAUTHORIZED = "UNAUTHORIZED",
}

export interface ClientReponseError {
  code: ApolloErrorCode;
  message: string;
  detail?: any;
}

export class CustomGraphQLError extends GraphQLError {
  constructor(
    { code, message, detail }: ClientReponseError,
    options?: GraphQLErrorOptions | undefined
  ) {
    super(message, options);

    this.extensions.code = code;
    this.extensions.custom_detail = message;

    if (detail) {
      this.extensions.detail = detail;
    }
  }
}
