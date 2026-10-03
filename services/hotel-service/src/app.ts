import express from "express";
import type { Express } from "express";

import v1Router from "./api/v1/router.js";
import v2Router from "./api/v2/router.js";

import { attachCorrelationIdMiddleware } from "./shared/middlewares/correlation-id.js";
import { routeNotFound } from "./shared/middlewares/route-not-found.js";
import { errorHandler } from "./shared/errors/error-handler.js";

export const createApp = (): Express => {
  const app = express();

  app.use(express.json());

  app.use(attachCorrelationIdMiddleware);

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api/v1", v1Router);
  app.use("/api/v2", v2Router);

  app.use(routeNotFound);
  app.use(errorHandler);

  return app;
};
