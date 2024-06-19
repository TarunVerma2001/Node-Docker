import { NextFunction, Response } from "express";

export const globalErrorHandler = async (
  error: any,
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const STATUS_CODE = error.status || 500;
  return res.status(STATUS_CODE).json({
    error: error.message,
  });
};
