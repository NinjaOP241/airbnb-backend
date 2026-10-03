import { Request, Response, NextFunction } from "express";

import type { ZodType } from "zod";
import { badRequest } from "../errors/app-error";

export const validateRequestBody = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw badRequest("Validation failed", result.error.issues);
    }

    req.body = result.data;

    next();
  };
};

export const validateQueryParams = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      throw badRequest("Validation failed", result.error.issues);
    }

    req.validatedQuery = result.data;

    next();
  };
};

export const validateRouteParams = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      throw badRequest("Validation failed", result.error.issues);
    }

    req.validatedParams = result.data;

    next();
  };
};
