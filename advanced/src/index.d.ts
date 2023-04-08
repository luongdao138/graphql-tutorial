import { Request, Response } from "express";
import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";

export type MikroEntityManager = EntityManager<IDatabaseDriver<Connection>>;

export type ExtendedRequest = Request & { user_id?: string; token?: string };
export interface MyContext {
  // You can optionally create a TS interface to set up types
  // for your contextValue
  em: MikroEntityManager;
  req: ExtendedRequest;
  res: Response;
}

export type JSONToken = {
  expiredAt: number;
  token: string;
};

export interface Pagination {
  nextToken: string | null;
  limit: number;
  hasMore: boolean = true;
}

export interface ResultWithCursorPagination<T> {
  data: T[];
  pagination: Pagination;
}
