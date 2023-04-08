import { MikroORM, RequestContext } from "@mikro-orm/core";
import mikroOrmConfig from "../mikro-orm.config";
import { Express } from "express";

export async function connectDB() {
  // init mikro orm instance
  const orm = await MikroORM.init(mikroOrmConfig);

  // bootstrap mikro orm migrations
  const migrator = orm.getMigrator();
  const migrations = await migrator.getPendingMigrations();
  if (migrations?.length) {
    await orm.getMigrator().up();
  }

  return orm;
}
