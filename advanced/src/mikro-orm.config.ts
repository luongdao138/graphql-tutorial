import { defineConfig } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import dotenv from "dotenv";
import path from "path";
import appConfig from "./config";

dotenv.config({ path: path.join(__dirname, "../.env") });

export default defineConfig({
  type: "postgresql",
  dbName: "lireddit",
  debug: !__prod__,
  entities: ["./dist/models"],
  user: appConfig.postgres.user,
  password: appConfig.postgres.password,
  port: Number(appConfig.postgres.port),
  highlighter: new SqlHighlighter(),
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    glob: "!(*.d).{js,ts}", // how to match migration files (all .js and .ts files, but not .d.ts)
  },
});
