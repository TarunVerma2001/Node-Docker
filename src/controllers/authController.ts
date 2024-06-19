import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import prisma from "../db/prisma";
import { signupSchema, signInSchema } from "../schema/auth";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { email, password, name } = req.body;

    const isValid = signupSchema.safeParse(req.body);

    if (isValid.error) {
      return res.status(400).json({
        error: "Provided input are not valid",
      });
    }

    email = email.toLowerCase();
    name = name.toLowerCase();
    const userAlreadyExist = await prisma.user.findFirst({ where: { email } });
    if (userAlreadyExist) {
      return res.status(400).json({
        error: "email already exist, please login instead",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
    );

    return res.status(200).json({
      message: "Successfully signed up",
      token,
    });
  } catch (err: any) {
    err.status = err.status || 403;
    next(err);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { email, password } = req.body;

    const isValid = signInSchema.safeParse(req.body);

    if (isValid.error) {
      return res.status(400).json({
        error: "Provided input are not valid",
      });
    }

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return res.status(404).json({
        error: "User does not exist",
      });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(403).json({
        error: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
    );
    return res.status(200).json({
      message: "Successfuly signed in",
      token,
    });
  } catch (err: any) {
    err.status = err.status || 403;
    next(err);
  }
};
