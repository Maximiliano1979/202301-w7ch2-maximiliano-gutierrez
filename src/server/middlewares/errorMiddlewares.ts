import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import { CustomError } from "../../CustomError/CustomError.js";
import { ValidationError } from "express-validation";

export const debug = createDebug("robots:server");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Path not found", 404, "Endpoint not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    const validationErrors = error.details
      .body!.map((joiError) => joiError.message)
      .join(" & ");

    error.publicMessage = validationErrors;
    debug(validationErrors);
  }

  res
    .status(error.statusCode || 500)
    .json({ error: error.publicMessage || "Something went wrong" });
};
