import express from "express";
import { connectDB } from "./config/db";
import connectGraphQL from "./config/graphql";
import { connectRedisDB } from "./config/redis";
import useBaseMiddleware from "./middlewares/base";

(async () => {
  const app = express();

  // base middleware
  useBaseMiddleware(app);

  // connect postql db with mikro
  const orm = await connectDB();

  // connect graphql
  await connectGraphQL(app, orm.em);

  // connect redis db
  connectRedisDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 http://localhost:${PORT}/graphql`);
    console.log(`Server listening on port ${PORT}`);
  });
})().catch((error) => {
  console.log(error);
});
