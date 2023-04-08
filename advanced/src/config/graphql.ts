import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import { MikroEntityManager, MyContext } from "src";
import { AuthResolver } from "../grapql/auth/resolver";
import { buildSchema } from "type-graphql";
import { PostResolver } from "../grapql/post/resolver";
import authenticationMiddleware from "../middlewares/auth";
import { ApolloErrorCode, ClientReponseError } from "../utils/errors";
import { UserResolver } from "../grapql/user/resolver";

export default async function (app: Express, em: MikroEntityManager) {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, AuthResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) =>
      ({
        req,
        res,
        em: em.fork(),
      } as MyContext),
    // custom error before return to client
    formatError(error): ClientReponseError {
      const customError: ClientReponseError = {
        code: error.extensions.code as ApolloErrorCode,
        message:
          (error.extensions.custom_detail as string) ||
          ((error.extensions.exception as any)?.detail as string) ||
          error.message,
      };

      if (error.extensions.detail) {
        customError.detail = error.extensions.detail;
      }
      return customError;
    },
  });

  await apolloServer.start();

  // authentication middleware
  app.use(authenticationMiddleware);

  apolloServer.applyMiddleware({ app });
}
