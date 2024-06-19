import { NextFunction, Response } from "express";

import prisma from "../db/prisma";
import { createProjectSchema } from "../schema/project";

export const getProject = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { id } = req.body;
    let { apiKey } = req.query;

    if (!apiKey) {
      return res.status(404).json({
        error: "Please provide api key in the url",
      });
    }

    const apiKeyRes = await prisma.apiKey.findFirst({
      where: { apiKey: apiKey },
    });

    if (!apiKeyRes) {
      return res.status(404).json({
        error: "No Such api_key Exist",
      });
    }

    const project = await prisma.project.findFirst({ where: { id: id } });

    if (!project) {
      return res.status(404).json({
        error: "No Project with this Project Id Exist",
      });
    }

    if (apiKeyRes.projectId == id) {
      return res.status(200).json({
        message: "Here is the Project you requested for",
        data: project,
      });
    } else {
      return res.status(404).json({
        error: "No Project with this pair of api_key and projectId Exist",
      });
    }
  } catch (err: any) {
    err.status = err.status || 403;
    next(err);
  }
};

export const createProject = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { name, description } = req.body;

    const isValid = createProjectSchema.safeParse(req.body);

    if (isValid.error) {
      return res.status(400).json({
        error: "Provided input are not valid",
      });
    }

    name = name.toLowerCase();

    const project = await prisma.project.create({
      data: {
        name,
        description,
      },
    });

    return res.status(200).json({
      message: "Successfully Created the Project",
      data: project,
    });
  } catch (err: any) {
    err.status = err.status || 403;
    next(err);
  }
};
