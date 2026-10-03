import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/app-error.js";
import { getCorrelationId } from "../context/async-context.js";
import logger from "../logger/logger.js";
import { env } from "../config/env.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const correlationId = getCorrelationId();

  if (err instanceof AppError) {
    logger.warn("Application error", {
      errorName: err.name,
      statusCode: err.statusCode,
      message: err.message,
      correlationId,
      ...(err.details !== undefined && {
        details: err.details,
      }),
    });

    const body: Record<string, unknown> = {
      success: false,
      message: err.message,
    };

    if (err.details) body.details = err.details;

    res.status(err.statusCode).json(body);
    return;
  }

  logger.error("Unexpected error", {
    correlationId,
    error: err,
  });

  const body: Record<string, unknown> = {
    success: false,
    message: "Something went wrong",
  };

  if (env.NODE_ENV === "development") body.details = err.stack;

  res.status(500).json(body);
}
