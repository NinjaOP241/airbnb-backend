import { Request, Response, NextFunction } from "express";

import { notFound } from "../errors/app-error.js";

export function routeNotFound(
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  next(notFound("Route not found", { path: _req.originalUrl }));
}
