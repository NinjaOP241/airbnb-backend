import { randomUUID } from "node:crypto";
import { type Request, type Response, type NextFunction } from "express";
import { asyncLocalStorage } from "../context/async-context.js";

export function attachCorrelationIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const correlationId = req.get("X-Correlation-ID") ?? randomUUID();

  res.setHeader("X-Correlation-ID", correlationId);

  asyncLocalStorage.run({ correlationId }, () => {
    next();
  });
}