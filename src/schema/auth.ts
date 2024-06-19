import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
  })
  .strict();

export const signInSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();
