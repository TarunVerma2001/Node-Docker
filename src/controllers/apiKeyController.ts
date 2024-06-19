import { NextFunction, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../db/prisma";

import { createApiKeySchema } from "../schema/apiKey";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createApiKey = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { projectId } = req.body;

    const apiKey = await bcrypt.hash(projectId, 12);

    const isValid = createApiKeySchema.safeParse(req.body);

    if (isValid.error) {
      return res.status(400).json({
        error: "Provided input are not valid",
      });
    }

    await prisma.apiKey.create({
      data: {
        projectId,
        apiKey,
      },
    });

    return res.status(200).json({
      message: "Successfully Created Api Key for this Project",
      apiKey: apiKey,
    });
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      return res.status(404).json({
        message: "No Project with such Project Id",
      });
    }
    err.status = err.status || 403;
    next(err);
  }
};
