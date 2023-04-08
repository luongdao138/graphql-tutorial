import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ExtendedRequest, JSONToken, MyContext } from "src";
import { ApolloErrorCode, CustomGraphQLError } from "../utils/errors";
import { redisClient } from "../config/redis";
import settings from "../config/setting";
import { WHITE_LIST_ACCESS_TOKEN_PATTERN } from "../constants/user";
import { MiddlewareFn } from "type-graphql";

export const AuthGuard: MiddlewareFn<MyContext> = ({ context }, next) => {
  const userId = context.req.user_id;
  if (!userId) {
    throw new CustomGraphQLError({
      code: ApolloErrorCode.UNAUTHORIZED,
      message: "Unauthorized",
    });
  }

  // resolvers will be executed here
  return next();
};

export function validatorReq(req: ExtendedRequest): string {
  const userId = req.user_id;

  if (!userId) {
    throw new CustomGraphQLError({
      code: ApolloErrorCode.UNAUTHORIZED,
      message: "Unauthorized",
    });
  }

  return userId;
}

export default async function (
  req: ExtendedRequest,
  rest: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers["authorization"];

  const token = authorizationHeader?.split(" ")?.[1];
  if (!token) {
    return next();
  }

  jwt.verify(token!, settings.jwt.secret, async (error, data: any) => {
    if (error) {
      return next();
    }

    const userId: string = String(data.user_id);
    const listTokenKey = `${WHITE_LIST_ACCESS_TOKEN_PATTERN}${userId}`;

    // testing
    const allTokens = await redisClient.lrange(listTokenKey, 0, -1);

    const existToken = allTokens.find((item: string) => {
      const jsonItem: JSONToken = JSON.parse(item);
      return jsonItem.token === token;
    });

    if (!existToken) {
      return next();
    }

    req.token = existToken;
    req.user_id = userId;
    return next();
  });
}
