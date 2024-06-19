import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
// import { CustomRequest } from "../types/request_interface";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const isAuthenticated = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const auth_header = req.headers["authorization"];
    if (!auth_header) {
      throw new Error("Authorization header is invalid");
    }
    const token = auth_header.split("Bearer ")[1];
    const user_data = jwt.verify(token, JWT_SECRET);
    req.user = user_data;
    next();
  } catch (err: any) {
    err.status = 401;
    res.status(404).json({
      message: "Unauthorised",
    });
    next(err);
  }
};
