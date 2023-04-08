import express, { Express } from "express";
import cors from "cors";
import { ALLOWED_ORIGINS } from "../constants/index";

export default function (app: Express) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // cors
  app.use(cors({ origin: ALLOWED_ORIGINS }));
}
