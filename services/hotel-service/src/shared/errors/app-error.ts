export class AppError extends Error {
  readonly statusCode: number;
  readonly name: string;
  readonly details?: unknown;

  constructor(
    statusCode: number,
    name: string,
    message: string,
    details?: unknown,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.name = name;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const badRequest = (message: string, details?: unknown) =>
  new AppError(400, "BadRequestError", message, details);

export const unauthorized = (message: string, details?: unknown) =>
  new AppError(401, "UnauthorizedError", message, details);

export const forbidden = (message: string, details?: unknown) =>
  new AppError(403, "ForbiddenError", message, details);

export const notFound = (message: string, details?: unknown) =>
  new AppError(404, "NotFoundError", message, details);

export const conflict = (message: string, details?: unknown) =>
  new AppError(409, "ConflictError", message, details);
